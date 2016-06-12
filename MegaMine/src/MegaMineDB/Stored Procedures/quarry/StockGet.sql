IF OBJECTPROPERTY(OBJECT_ID('quarry.StockGet'), N'IsProcedure') = 1
	DROP PROCEDURE [quarry].[StockGet]
GO

CREATE PROCEDURE [quarry].[StockGet]
(
	@YardId INT,
	@ProductTypeId INT,
	@MaterialColourId INT,
	@StartDate datetime,
	@EndDate datetime
)
AS
BEGIN
	SET NOCOUNT ON

	SELECT 
		Quarry = qry.QuarryName,
		ProductType = pt.ProductTypeName,
		MaterialColour = mc.ColourName,
		MaterialId = mt.MaterialId,
		BlockNumber = mt.BlockNumber,
		QuarryId = mt.QuarryId,
		YardId = mt.YardId,
		ProductTypeId = mt.ProductTypeId,
		MaterialColourId = mt.MaterialColourId,
		Dimensions = mt.Dimensions,
		Length = mt.Length,
		Width = mt.Width,
		Height = mt.Height,
		Weight = mt.Weight,
		MaterialDate = mt.MaterialDate
	FROM quarry.Material mt
		inner join quarry.QuarRY qry on mt.QuarryId = qry.QuarryId
		inner join quarry.ProductType pt on mt.ProductTypeId = pt.ProductTypeId
		inner join quarry.MaterialColour mc  on mt.MaterialColourId = mc.MaterialColourId
	WHERE mt.DeletedInd = 0
		AND mt.YardId = @YardId
		AND (@ProductTypeId IS NULL OR pt.ProductTypeId = @ProductTypeId)
		AND (@MaterialColourId is NULL OR mc.MaterialColourId = @MaterialColourId)
		AND (@StartDate IS NULL OR mt.MaterialDate >= @StartDate)
		AND (@EndDate IS NULL OR mt.MaterialDate <= @EndDate)

	SET NOCOUNT OFF
END
GO


