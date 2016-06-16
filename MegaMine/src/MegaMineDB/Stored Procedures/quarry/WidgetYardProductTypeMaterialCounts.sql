IF OBJECTPROPERTY(OBJECT_ID('quarry.WidgetYardProductTypeMaterialCounts'), N'IsProcedure') = 1
	DROP PROCEDURE [quarry].[WidgetYardProductTypeMaterialCounts] 
GO

CREATE PROCEDURE [quarry].[WidgetYardProductTypeMaterialCounts] 
(
	@CompanyId int
)
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @YardTop5 AS TABLE(YardId int)

	INSERT INTO @YardTop5(YardId)
	SELECT TOP 5 YardId 
	FROM quarry.Material
	WHERE CompanyId = @CompanyId AND DeletedInd = 0 AND ProcessType = 1
	GROUP BY YardId
	ORDER BY COUNT(MaterialId) DESC;

	SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = pt.ProductTypeName, X = yrd.YardName, Y = COUNT(mat.MaterialId), KeyOrder = pt.DisplayOrder, XOrder = 0
	FROM quarry.Material mat
	JOIN quarry.Yard yrd on yrd.YardId = mat.YardId
	JOIN quarry.ProductType pt on pt.ProductTypeId = mat.ProductTypeId
	WHERE EXISTS(SELECT 1 FROM @YardTop5 q5 WHERE q5.YardId = mat.YardId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0 AND mat.ProcessType = 1
	GROUP BY mat.YardId, yrd.YardName, mat.ProductTypeId, pt.ProductTypeName, pt.DisplayOrder
	UNION ALL
	SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = pt.ProductTypeName, X = 'Others', Y = COUNT(mat.MaterialId), KeyOrder = pt.DisplayOrder, XOrder = 1
	FROM quarry.Material mat
	JOIN quarry.ProductType pt on pt.ProductTypeId = mat.ProductTypeId
	WHERE NOT EXISTS(SELECT 1 FROM @YardTop5 q5 WHERE q5.YardId = mat.YardId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0 AND mat.ProcessType = 1
	GROUP BY mat.ProductTypeId, pt.ProductTypeName, pt.DisplayOrder
	ORDER BY KeyOrder, [Key], XOrder, X


	SET NOCOUNT OFF
END
go
--exec [quarry].[WidgetYardProductTypeMaterialCounts]  4;