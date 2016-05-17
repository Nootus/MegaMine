if objectproperty(object_id('dbo.GetQuarrySummary'), N'IsProcedure') = 1
	drop procedure [dbo].GetQuarrySummary
go

create procedure [dbo].[GetQuarrySummary]
(
	@CompanyId int,
	@StartDate datetime,
	@EndDate datetime
)
as
begin

	set nocount on

	if(@StartDate is null)
	begin
		select @StartDate = min(MaterialDate) from Material where CompanyId = @CompanyId
	end

	if(	@EndDate is null)
	begin
		select @EndDate = max(MaterialDate) from Material where CompanyId = @CompanyId
	end
	else
	begin
		select @EndDate = DATEADD(SECOND, -1, DATEADD(DAY, 1, @EndDate))
	end

	declare @columns nvarchar(500),
		@totals nvarchar(1000)
	select @columns = isnull(@columns + ', ', '') + quotename(ProductTypeName),
		@totals = isnull(@totals + ' + ', '') + 'coalesce(' + quotename(ProductTypeName) + ', 0)'
	from ProductType 
	where DeletedInd = 0 and CompanyId = @CompanyId
	order by DisplayOrder;

	create table #Quarry
	(
	   QuarryId int,
	   QuarryName nvarchar(200),
	   Colours nvarchar(2000)
	);

	with QuarryColours as 
	(
		select q.QuarryId, QuarryName, ColourName
		from QuarryMaterialColour qmc
		inner join Quarry q on qmc.QuarryId = q.QuarryId
		inner join MaterialColour mc on qmc.MaterialColourId = mc.MaterialColourId
		where q.DeletedInd = 0 and q.CompanyId = @CompanyId
	)
	insert into #Quarry
	select QuarryId, QuarryName,  
		Colours = STUFF((select ',' + qc1.ColourName from QuarryColours qc1 where qc1.QuarryName = qc2.QuarryName for xml path('')),1,1,'')
	from QuarryColours as qc2
	group by qc2.QuarryName, qc2.QuarryId;

	declare @query nvarchar(4000) = '
	with SummaryData as
	(
		select q.QuarryId, QuarryName, q.Colours, pt.ProductTypeName, MaterialCount = count(MaterialId)
		from #Quarry q
		left join Material m on q.QuarryId = m.QuarryId
		left join ProductType pt on m.ProductTypeId = pt.ProductTypeId 
		where MaterialDate between ''' + convert(varchar(50), @StartDate, 121) + ''' and ''' + convert(varchar(50), @EndDate, 121) + '''
		group by pt.ProductTypeName, QuarryName, q.QuarryId, q.Colours
	)
	select QuarryId, QuarryName, Colours, ' + @columns + ', Total = ' + @totals + ' from SummaryData
	pivot(sum(MaterialCount) for ProductTypeName IN (' + @columns + ')) as SummaryPivot
	order by QuarryName';

	execute sp_executesql @query

	drop table #Quarry
	set nocount off
end
go


