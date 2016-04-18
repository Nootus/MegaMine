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
        pt.ProductTypeId, pt.ProductTypeName, COUNT(mat.MaterialId) AS MaterialCount
      FROM quarry.Material mat
		JOIN quarry.ProductType pt ON mat.ProductTypeId = pt.ProductTypeId
	  WHERE mat.CompanyId = @CompanyID
	    AND mat.DeletedInd = 0
      GROUP BY pt.ProductTypeId, pt.ProductTypeName
    )
    SELECT Id = convert(varchar, ProductTypeId), [Key] = 'Pie', X = ProductTypeName, Y = MaterialCount, DisplayOrder = 0 FROM cte WHERE Seq BETWEEN 1 AND 5
    UNION ALL
    SELECT '0', [Key] = 'Pie', X = 'Others', Y = SUM(MaterialCount), DisplayOrder = 1 FROM cte WHERE Seq > 5
	ORDER BY DisplayOrder, ProductTypeName

	SET NOCOUNT OFF
END
go

--exec [quarry].[WidgetProductTypeMaterialCounts] 4