IF OBJECTPROPERTY(OBJECT_ID('quarry.WidgetProductTypeMaterialColourMaterialCounts'), N'IsProcedure') = 1
	DROP PROCEDURE [quarry].[WidgetProductTypeMaterialColourMaterialCounts] 
GO

CREATE PROCEDURE [quarry].[WidgetProductTypeMaterialColourMaterialCounts] 
(
	@CompanyId int
)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @MaterialColourTop5 AS TABLE(MaterialColourId int)

	INSERT INTO @MaterialColourTop5(MaterialColourId)
	SELECT TOP 5 MaterialColourId 
	FROM quarry.Material
	WHERE CompanyId = @CompanyId
	  AND DeletedInd = 0
	GROUP BY MaterialColourId
	ORDER BY COUNT(MaterialId) DESC;


	DECLARE @ProductTypeTop5 AS TABLE(ProductTypeId int)

	INSERT INTO @ProductTypeTop5(ProductTypeId)
	SELECT TOP 5 ProductTypeId 
	FROM quarry.Material
	WHERE CompanyId = @CompanyId
	  AND DeletedInd = 0
	GROUP BY ProductTypeId
	ORDER BY COUNT(MaterialId) DESC;

	SELECT Id = convert(varchar(10), mat.ProductTypeId) + '-' + convert(varchar(10), mat.MaterialColourId), [Key] = mc.ColourName, X = pt.ProductTypeName, Y = COUNT(mat.MaterialId), DisplayOrder = 0
	FROM quarry.Material mat
	JOIN quarry.ProductType pt on pt.ProductTypeId = mat.ProductTypeId
	JOIN quarry.MaterialColour mc on mc.MaterialColourId = mat.MaterialColourId
	WHERE EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND EXISTS(SELECT 1 FROM @MaterialColourTop5 q5 WHERE q5.MaterialColourId = mat.MaterialColourId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0
	GROUP BY mat.ProductTypeId, pt.ProductTypeName, mat.MaterialColourId, mc.ColourName
	UNION ALL
	SELECT Id = convert(varchar(10), mat.ProductTypeId) + '-0', [Key] = 'Other Colours', X = pt.ProductTypeName, Y = COUNT(mat.MaterialId), DisplayOrder = 0
	FROM quarry.Material mat
	JOIN quarry.ProductType pt on pt.ProductTypeId = mat.ProductTypeId
	WHERE EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND NOT EXISTS(SELECT 1 FROM @MaterialColourTop5 q5 WHERE q5.MaterialColourId = mat.MaterialColourId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0
	GROUP BY mat.ProductTypeId, pt.ProductTypeName
	UNION ALL
	SELECT Id = '0-' + convert(varchar(10), mat.MaterialColourId), [Key] = mc.ColourName, X = 'Others', Y = COUNT(mat.MaterialId), DisplayOrder = 1
	FROM quarry.Material mat
	JOIN quarry.MaterialColour mc on mc.MaterialColourId = mat.MaterialColourId
	WHERE NOT EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND EXISTS(SELECT 1 FROM @MaterialColourTop5 q5 WHERE q5.MaterialColourId = mat.MaterialColourId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0
	GROUP BY mat.MaterialColourId, mc.ColourName
	UNION ALL
	SELECT Id = '0-0', [Key] = 'Other Colours', X = 'Others', Y = COUNT(mat.MaterialId), DisplayOrder = 1
	FROM quarry.Material mat
	WHERE NOT EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND NOT EXISTS(SELECT 1 FROM @MaterialColourTop5 q5 WHERE q5.MaterialColourId = mat.MaterialColourId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0
	ORDER BY DisplayOrder, ColourName, ProductTypeName

	SET NOCOUNT OFF
END
go
--exec [quarry].[WidgetProductTypeMaterialColourMaterialCounts]  4;