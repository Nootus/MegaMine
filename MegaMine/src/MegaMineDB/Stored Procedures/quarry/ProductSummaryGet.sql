if objectproperty(object_id('dbo.ProductSummaryGet'), N'IsProcedure') = 1
	drop procedure [dbo].[ProductSummaryGet]
go

create procedure [dbo].[ProductSummaryGet]
(
	@CompanyId int,
	@QuarryIds varchar(1000),
	@ProductTypeIds varchar(100),
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
		select @EndDate = dateadd(second, -1, dateadd(day, 1, @EndDate))
	end

	declare @SelectedQuarries table (QuarryId int)
	insert into @SelectedQuarries(QuarryId) 
	select id from SplitCsv(@QuarryIds)
	if @@rowcount = 0 
	begin
		insert into @SelectedQuarries(QuarryId) 
		select QuarryId from Quarry
	end

	declare @SelectedProductTypes table (ProductTypeId int)
	insert into @SelectedProductTypes(ProductTypeId) 
	select id from SplitCsv(@ProductTypeIds)
	if @@rowcount = 0 
	begin
		insert into @SelectedProductTypes(ProductTypeId) 
		select ProductTypeId from ProductType
	end

    select RowId = row_number() over (order by pt.DisplayOrder, pt.ProductTypeName, qry.QuarryName),  pt.ProductTypeId, pt.ProductTypeName, qry.QuarryId, qry.QuarryName, MaterialCount = count(mt.MaterialId)
	from Material mt
	inner join Quarry qry on mt.QuarryId = qry.QuarryId
	inner join ProductType pt on mt.ProductTypeId = pt.ProductTypeId
	where mt.MaterialDate between @StartDate and @EndDate
	  and mt.CompanyId = @CompanyId and mt.DeletedInd = 0
	  and qry.DeletedInd = 0 and pt.DeletedInd = 0 
	  and exists(select 1 from @SelectedQuarries sq where sq.QuarryId = mt.QuarryId)
	  and exists(select 1 from @SelectedProductTypes spt where spt.ProductTypeId = mt.ProductTypeId)
	group by pt.ProductTypeId, pt.ProductTypeName, pt.DisplayOrder, qry.QuarryId, qry.QuarryName
	order by pt.DisplayOrder, pt.ProductTypeName, qry.QuarryName

	set nocount off
end
go


