IF OBJECTPROPERTY(OBJECT_ID('quarry.WidgetProductTypeQuarryMaterialCounts'), N'IsProcedure') = 1
	DROP PROCEDURE [quarry].[WidgetProductTypeQuarryMaterialCounts] 
GO

CREATE PROCEDURE [quarry].[WidgetProductTypeQuarryMaterialCounts] 
(
	@CompanyId int
)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @QuarryTop5 AS TABLE(QuarryId int)

	INSERT INTO @QuarryTop5(QuarryId)
	SELECT TOP 5 QuarryId 
	FROM quarry.Material
	WHERE CompanyId = @CompanyId
	  AND DeletedInd = 0
	GROUP BY QuarryId
	ORDER BY COUNT(MaterialId) DESC;


	DECLARE @ProductTypeTop5 AS TABLE(ProductTypeId int)

	INSERT INTO @ProductTypeTop5(ProductTypeId)
	SELECT TOP 5 ProductTypeId 
	FROM quarry.Material
	WHERE CompanyId = @CompanyId
	  AND DeletedInd = 0
	GROUP BY ProductTypeId
	ORDER BY COUNT(MaterialId) DESC;

	SELECT Id = convert(varchar(10), mat.ProductTypeId) + '-' + convert(varchar(10), mat.QuarryId), [Key] = qry.QuarryName, X = pt.ProductTypeName, Y = COUNT(mat.MaterialId), DisplayOrder = 0
	FROM quarry.Material mat
	JOIN quarry.ProductType pt on pt.ProductTypeId = mat.ProductTypeId
	JOIN quarry.Quarry qry on qry.QuarryId = mat.QuarryId
	WHERE EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND EXISTS(SELECT 1 FROM @QuarryTop5 q5 WHERE q5.QuarryId = mat.QuarryId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0
	GROUP BY mat.ProductTypeId, pt.ProductTypeName, mat.QuarryId, qry.QuarryName
	UNION ALL
	SELECT Id = convert(varchar(10), mat.ProductTypeId) + '-0', [Key] = 'Other Quarries', X = pt.ProductTypeName, Y = COUNT(mat.MaterialId), DisplayOrder = 0
	FROM quarry.Material mat
	JOIN quarry.ProductType pt on pt.ProductTypeId = mat.ProductTypeId
	WHERE EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND NOT EXISTS(SELECT 1 FROM @QuarryTop5 q5 WHERE q5.QuarryId = mat.QuarryId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0
	GROUP BY mat.ProductTypeId, pt.ProductTypeName
	UNION ALL
	SELECT Id = '0-' + convert(varchar(10), mat.QuarryId), [Key] = qry.QuarryName, X = 'Others', Y = COUNT(mat.MaterialId), DisplayOrder = 1
	FROM quarry.Material mat
	JOIN quarry.Quarry qry on qry.QuarryId = mat.QuarryId
	WHERE NOT EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND EXISTS(SELECT 1 FROM @QuarryTop5 q5 WHERE q5.QuarryId = mat.QuarryId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0
	GROUP BY mat.QuarryId, qry.QuarryName
	UNION ALL
	SELECT Id = '0-0', [Key] = 'Other Quarries', X = 'Others', Y = COUNT(mat.MaterialId), DisplayOrder = 1
	FROM quarry.Material mat
	WHERE NOT EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND NOT EXISTS(SELECT 1 FROM @QuarryTop5 q5 WHERE q5.QuarryId = mat.QuarryId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0
	ORDER BY DisplayOrder, QuarryName, ProductTypeName

	SET NOCOUNT OFF
END
go
exec [quarry].[WidgetProductTypeQuarryMaterialCounts]  4;