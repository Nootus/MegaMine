IF OBJECTPROPERTY(OBJECT_ID('quarry.WidgetQuarryProductTypeMaterialCounts'), N'IsProcedure') = 1
	DROP PROCEDURE [quarry].[WidgetQuarryProductTypeMaterialCounts] 
GO

CREATE PROCEDURE [quarry].[WidgetQuarryProductTypeMaterialCounts] 
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

	SELECT QuarryProductTypeId = convert(varchar(10), mat.QuarryId) + '-' + convert(varchar(10), mat.ProductTypeId), mat.QuarryId, qry.QuarryName, mat.ProductTypeId, pt.ProductTypeName, MaterialCount = COUNT(mat.MaterialId), DisplayOrder = 0
	FROM quarry.Material mat
	JOIN quarry.Quarry qry on qry.QuarryId = mat.QuarryId
	JOIN quarry.ProductType pt on pt.ProductTypeId = mat.ProductTypeId
	WHERE EXISTS(SELECT 1 FROM @QuarryTop5 q5 WHERE q5.QuarryId = mat.QuarryId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0
	GROUP BY mat.QuarryId, qry.QuarryName, mat.ProductTypeId, pt.ProductTypeName
	UNION ALL
	SELECT QuarryProductTypeId = '0-' + convert(varchar(10), mat.ProductTypeId), QuarryId = 0, QuarryName = 'Others', mat.ProductTypeId, pt.ProductTypeName, MaterialCount = COUNT(mat.MaterialId), DisplayOrder = 1
	FROM quarry.Material mat
	JOIN quarry.ProductType pt on pt.ProductTypeId = mat.ProductTypeId
	WHERE NOT EXISTS(SELECT 1 FROM @QuarryTop5 q5 WHERE q5.QuarryId = mat.QuarryId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0
	GROUP BY mat.ProductTypeId, pt.ProductTypeName
	ORDER BY DisplayOrder, ProductTypeName, QuarryName


	SET NOCOUNT OFF
END
go
exec [quarry].[WidgetQuarryProductTypeMaterialCounts]  4;