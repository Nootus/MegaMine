if objectproperty(object_id('dbo.ProductSummaryGet'), N'IsProcedure') = 1
	drop procedure [dbo].[ProductSummaryGet]
go

create procedure [dbo].[ProductSummaryGet]
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

    select RowId = ROW_NUMBER() OVER (order by pt.DisplayOrder, pt.ProductTypeName, qry.QuarryName),  pt.ProductTypeId, pt.ProductTypeName, qry.QuarryId, qry.QuarryName, MaterialCount = count(mt.MaterialId)
	from Material mt
	inner join Quarry qry on mt.QuarryId = qry.QuarryId
	inner join ProductType pt on mt.ProductTypeId = pt.ProductTypeId
	where mt.MaterialDate between @StartDate and @EndDate
	  and mt.CompanyId = @CompanyId and mt.DeletedInd = 0
	  and qry.DeletedInd = 0 and pt.DeletedInd = 0 
	group by pt.ProductTypeId, pt.ProductTypeName, pt.DisplayOrder, qry.QuarryId, qry.QuarryName
	order by pt.DisplayOrder, pt.ProductTypeName, qry.QuarryName

	set nocount off
end
go


