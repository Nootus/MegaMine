IF OBJECTPROPERTY(OBJECT_ID('quarry.WidgetMaterialColourProductTypeMaterialCounts'), N'IsProcedure') = 1
	DROP PROCEDURE [quarry].[WidgetMaterialColourProductTypeMaterialCounts] 
GO

CREATE PROCEDURE [quarry].[WidgetMaterialColourProductTypeMaterialCounts] 
(
	@CompanyId int
)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @ProductTypeTop5 AS TABLE(ProductTypeId int)

	INSERT INTO @ProductTypeTop5(ProductTypeId)
	SELECT TOP 5 ProductTypeId 
	FROM quarry.Material
	WHERE CompanyId = @CompanyId AND DeletedInd = 0 AND ProcessTypeId = 1
	GROUP BY ProductTypeId
	ORDER BY COUNT(MaterialId) DESC;


	DECLARE @MaterialColourTop5 AS TABLE(MaterialColourId int)

	INSERT INTO @MaterialColourTop5(MaterialColourId)
	SELECT TOP 5 MaterialColourId 
	FROM quarry.Material
	WHERE CompanyId = @CompanyId AND DeletedInd = 0 AND ProcessTypeId = 1
	GROUP BY MaterialColourId
	ORDER BY COUNT(MaterialId) DESC;

	SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = pt.ProductTypeName, X = mc.ColourName, Y = COUNT(mat.MaterialId), KeyOrder = pt.DisplayOrder, XOrder = 0
	FROM quarry.Material mat
	JOIN quarry.MaterialColour mc on mc.MaterialColourId = mat.MaterialColourId
	JOIN quarry.ProductType pt on pt.ProductTypeId = mat.ProductTypeId
	WHERE EXISTS(SELECT 1 FROM @MaterialColourTop5 mc5 WHERE mc5.MaterialColourId = mat.MaterialColourId)
	AND EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0 AND mat.ProcessTypeId = 1
	GROUP BY mat.MaterialColourId, mc.ColourName, mat.ProductTypeId, pt.ProductTypeName, pt.DisplayOrder
	UNION ALL
	SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = 'Other Product Types', X = mc.ColourName, Y = COUNT(mat.MaterialId), KeyOrder = 1000, XOrder = 0
	FROM quarry.Material mat
	JOIN quarry.MaterialColour mc on mc.MaterialColourId = mat.MaterialColourId
	WHERE EXISTS(SELECT 1 FROM @MaterialColourTop5 mc5 WHERE mc5.MaterialColourId = mat.MaterialColourId)
	AND NOT EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0 AND mat.ProcessTypeId = 1
	GROUP BY mat.MaterialColourId, mc.ColourName
	UNION ALL
	SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = pt.ProductTypeName, X = 'Others', Y = COUNT(mat.MaterialId), KeyOrder = pt.DisplayOrder, XOrder = 1
	FROM quarry.Material mat
	JOIN quarry.ProductType pt on pt.ProductTypeId = mat.ProductTypeId
	WHERE NOT EXISTS(SELECT 1 FROM @MaterialColourTop5 mc5 WHERE mc5.MaterialColourId = mat.MaterialColourId)
	AND EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0 AND mat.ProcessTypeId = 1
	GROUP BY mat.ProductTypeId, pt.ProductTypeName, pt.DisplayOrder
	UNION ALL
	SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = 'Other Product Types', X = 'Others', Y = COUNT(mat.MaterialId), KeyOrder = 1000, XOrder = 1
	FROM quarry.Material mat
	WHERE NOT EXISTS(SELECT 1 FROM @MaterialColourTop5 mc5 WHERE mc5.MaterialColourId = mat.MaterialColourId)
	AND NOT EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0 AND mat.ProcessTypeId = 1
	HAVING COUNT(mat.MaterialId) > 0
	ORDER BY KeyOrder, [Key], XOrder, X

	SET NOCOUNT OFF
END
go
--exec [quarry].[WidgetMaterialColourProductTypeMaterialCounts]  4;