IF OBJECTPROPERTY(OBJECT_ID('quarry.WidgetProductTypeMaterialCounts'), N'IsProcedure') = 1
	DROP PROCEDURE [quarry].[WidgetProductTypeMaterialCounts] 
GO

CREATE PROCEDURE [quarry].[WidgetProductTypeMaterialCounts]
(
	@CompanyID int
)
AS
BEGIN
	SET NOCOUNT ON;

    WITH cte AS (
      SELECT ROW_NUMBER() OVER (ORDER BY (COUNT(mat.MaterialId)) DESC) AS Seq, 
        pt.ProductTypeId, pt.ProductTypeName, COUNT(mat.MaterialId) AS MaterialCount, pt.DisplayOrder
      FROM quarry.Material mat
		JOIN quarry.ProductType pt ON mat.ProductTypeId = pt.ProductTypeId
	  WHERE mat.CompanyId = @CompanyID AND mat.DeletedInd = 0 AND mat.ProcessTypeId = 1
      GROUP BY pt.ProductTypeId, pt.ProductTypeName, pt.DisplayOrder
    )
    SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = 'Key', X = ProductTypeName, Y = MaterialCount, KeyOrder = 0, xOrder = DisplayOrder FROM cte WHERE Seq BETWEEN 1 AND 5
    UNION ALL
    SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = 'Key', X = 'Others', Y = SUM(MaterialCount), KeyOrder = 1, xOrder = 1000 FROM cte WHERE Seq > 5
	HAVING SUM(MaterialCount) IS NOT NULL
	ORDER BY KeyOrder, [Key], XOrder, X

	SET NOCOUNT OFF	
END
go

--exec [quarry].[WidgetProductTypeMaterialCounts] 4