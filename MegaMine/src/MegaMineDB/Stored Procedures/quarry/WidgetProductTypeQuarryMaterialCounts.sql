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
	WHERE CompanyId = @CompanyId AND DeletedInd = 0 AND ProcessTypeId = 1
	GROUP BY QuarryId
	ORDER BY COUNT(MaterialId) DESC;


	DECLARE @ProductTypeTop5 AS TABLE(ProductTypeId int)

	INSERT INTO @ProductTypeTop5(ProductTypeId)
	SELECT TOP 5 ProductTypeId 
	FROM quarry.Material
	WHERE CompanyId = @CompanyId AND DeletedInd = 0 AND ProcessTypeId = 1
	GROUP BY ProductTypeId
	ORDER BY COUNT(MaterialId) DESC;

	SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = qry.QuarryName, X = pt.ProductTypeName, Y = COUNT(mat.MaterialId), KeyOrder = 0, XOrder = pt.DisplayOrder
	FROM quarry.Material mat
	JOIN quarry.ProductType pt on pt.ProductTypeId = mat.ProductTypeId
	JOIN quarry.Quarry qry on qry.QuarryId = mat.QuarryId
	WHERE EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND EXISTS(SELECT 1 FROM @QuarryTop5 q5 WHERE q5.QuarryId = mat.QuarryId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0 AND mat.ProcessTypeId = 1
	GROUP BY mat.ProductTypeId, pt.ProductTypeName, pt.DisplayOrder, mat.QuarryId, qry.QuarryName
	UNION ALL
	SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = 'Other Quarries', X = pt.ProductTypeName, Y = COUNT(mat.MaterialId), KeyOrder = 1, XOrder = pt.DisplayOrder
	FROM quarry.Material mat
	JOIN quarry.ProductType pt on pt.ProductTypeId = mat.ProductTypeId
	WHERE EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND NOT EXISTS(SELECT 1 FROM @QuarryTop5 q5 WHERE q5.QuarryId = mat.QuarryId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0 AND mat.ProcessTypeId = 1
	GROUP BY mat.ProductTypeId, pt.ProductTypeName, pt.DisplayOrder
	UNION ALL
	SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = qry.QuarryName, X = 'Others', Y = COUNT(mat.MaterialId), KeyOrder = 0, XOrder = 1000
	FROM quarry.Material mat
	JOIN quarry.Quarry qry on qry.QuarryId = mat.QuarryId
	WHERE NOT EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND EXISTS(SELECT 1 FROM @QuarryTop5 q5 WHERE q5.QuarryId = mat.QuarryId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0 AND mat.ProcessTypeId = 1
	GROUP BY mat.QuarryId, qry.QuarryName
	UNION ALL
	SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = 'Other Quarries', X = 'Others', Y = COUNT(mat.MaterialId), KeyOrder = 1, XOrder = 1000
	FROM quarry.Material mat
	WHERE NOT EXISTS(SELECT 1 FROM @ProductTypeTop5 pt5 WHERE pt5.ProductTypeId = mat.ProductTypeId)
	AND NOT EXISTS(SELECT 1 FROM @QuarryTop5 q5 WHERE q5.QuarryId = mat.QuarryId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0 AND mat.ProcessTypeId = 1
	HAVING COUNT(mat.MaterialId) > 0
	ORDER BY KeyOrder, [Key], XOrder, X

	SET NOCOUNT OFF
END
go
--exec [quarry].[WidgetProductTypeQuarryMaterialCounts]  4;