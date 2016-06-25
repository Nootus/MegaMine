IF OBJECTPROPERTY(OBJECT_ID('quarry.ProductSummaryGet'), N'IsProcedure') = 1
	DROP PROCEDURE [quarry].[ProductSummaryGet]
GO

CREATE PROCEDURE [quarry].[ProductSummaryGet]
(
	@CompanyId int,
	@QuarryIds varchar(1000),
	@ProductTypeIds varchar(100),
	@MaterialColourIds varchar(100),
	@StartDate datetime,
	@EndDate datetime
)
AS
BEGIN
	SET NOCOUNT ON

	IF(@StartDate is null)
	BEGIN
		SELECT @StartDate = MIN(MaterialDate) FROM quarry.Material WHERE CompanyId = @CompanyId
	END

	IF(	@EndDate is null)
	BEGIN
		SELECT @EndDate = MAX(MaterialDate) FROM quarry.Material WHERE CompanyId = @CompanyId
	END
	ELSE
	BEGIN
		SELECT @EndDate = DATEADD(second, -1, DATEADD(day, 1, @EndDate))
	END

	DECLARE @SelectedQuarries TABLE (QuarryId INT)
	INSERT INTO @SelectedQuarries(QuarryId) 
	SELECT id FROM SplitCsv(@QuarryIds)
	IF @@ROWCOUNT = 0 
	BEGIN
		INSERT INTO @SelectedQuarries(QuarryId) 
		SELECT QuarryId FROM quarry.Quarry WHERE CompanyId = @CompanyId and DeletedInd = 0
	END

	DECLARE @SelectedProductTypes TABLE (ProductTypeId INT)
	INSERT INTO @SelectedProductTypes(ProductTypeId) 
	SELECT id FROM SplitCsv(@ProductTypeIds)
	IF @@ROWCOUNT = 0 
	BEGIN
		INSERT INTO @SelectedProductTypes(ProductTypeId) 
		SELECT ProductTypeId FROM quarry.ProductType WHERE CompanyId = @CompanyId AND DeletedInd = 0
	END

	DECLARE @SelectedMaterialColours TABLE (MaterialColourId INT)
	INSERT INTO @SelectedMaterialColours(MaterialColourId) 
	SELECT id FROM SplitCsv(@MaterialColourIds)
	IF @@ROWCOUNT = 0 
	BEGIN
		INSERT INTO @SelectedMaterialColours(MaterialColourId) 
		SELECT MaterialColourId FROM quarry.MaterialColour WHERE CompanyId = @CompanyId and DeletedInd = 0
	END

    SELECT Id = CONVERT(VARCHAR(40), NEWID()),  
		pt.ProductTypeId, pt.ProductTypeName, 
		qry.QuarryId, qry.QuarryName, 
		mc.MaterialColourId, mc.ColourName,
		pct.ProcessTypeId, pct.ProcessTypeName,
		MaterialQuantityWeight = count(mt.MaterialId),
		pt.DisplayOrder
	FROM quarry.Material mt
	INNER JOIN quarry.Quarry qry ON mt.QuarryId = qry.QuarryId
	INNER JOIN quarry.ProductType pt ON mt.ProductTypeId = pt.ProductTypeId
	INNER JOIN quarry.MaterialColour mc ON mt.MaterialColourId = mc.MaterialColourId
	INNER JOIN quarry.ProcessType pct on mt.ProcessTypeId = pct.ProcessTypeId
	WHERE mt.MaterialDate BETWEEN @StartDate AND @EndDate
	  AND mt.ProcessTypeId = 1
	  AND mt.CompanyId = @CompanyId AND mt.DeletedInd = 0
	  AND qry.DeletedInd = 0 AND pt.DeletedInd = 0 
	  AND EXISTS(SELECT 1 FROM @SelectedQuarries sq WHERE sq.QuarryId = mt.QuarryId)
	  AND EXISTS(SELECT 1 FROM @SelectedProductTypes spt WHERE spt.ProductTypeId = mt.ProductTypeId)
	  AND EXISTS(SELECT 1 FROM @SelectedMaterialColours smc WHERE smc.MaterialColourId = mt.MaterialColourId)
	GROUP BY pt.ProductTypeId, pt.ProductTypeName, pt.DisplayOrder, qry.QuarryId, qry.QuarryName, mc.MaterialColourId, mc.ColourName, pct.ProcessTypeId, pct.ProcessTypeName

	UNION ALL

    SELECT Id = CONVERT(VARCHAR(40), NEWID()),  
		pt.ProductTypeId, pt.ProductTypeName, 
		qry.QuarryId, qry.QuarryName, 
		mc.MaterialColourId, mc.ColourName,
		pct.ProcessTypeId, pct.ProcessTypeName,
		MaterialQuantityWeight = sum(mt.Weight),
		pt.DisplayOrder
	FROM quarry.Material mt
	INNER JOIN quarry.Quarry qry ON mt.QuarryId = qry.QuarryId
	INNER JOIN quarry.ProductType pt ON mt.ProductTypeId = pt.ProductTypeId
	INNER JOIN quarry.MaterialColour mc ON mt.MaterialColourId = mc.MaterialColourId
	INNER JOIN quarry.ProcessType pct on mt.ProcessTypeId = pct.ProcessTypeId
	WHERE mt.MaterialDate BETWEEN @StartDate AND @EndDate
	  AND mt.ProcessTypeId = 2
	  AND mt.CompanyId = @CompanyId AND mt.DeletedInd = 0
	  AND qry.DeletedInd = 0 AND pt.DeletedInd = 0 
	  AND EXISTS(SELECT 1 FROM @SelectedQuarries sq WHERE sq.QuarryId = mt.QuarryId)
	  AND EXISTS(SELECT 1 FROM @SelectedProductTypes spt WHERE spt.ProductTypeId = mt.ProductTypeId)
	  AND EXISTS(SELECT 1 FROM @SelectedMaterialColours smc WHERE smc.MaterialColourId = mt.MaterialColourId)
	GROUP BY pt.ProductTypeId, pt.ProductTypeName, pt.DisplayOrder, qry.QuarryId, qry.QuarryName, mc.MaterialColourId, mc.ColourName, pct.ProcessTypeId, pct.ProcessTypeName

	ORDER BY pt.DisplayOrder, pt.ProductTypeName, qry.QuarryName

	SET NOCOUNT OFF
END
GO


