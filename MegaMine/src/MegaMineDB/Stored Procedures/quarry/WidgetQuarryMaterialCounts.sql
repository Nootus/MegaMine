IF OBJECTPROPERTY(OBJECT_ID('quarry.WidgetQuarryMaterialCounts'), N'IsProcedure') = 1
	DROP PROCEDURE [quarry].[WidgetQuarryMaterialCounts] 
GO

CREATE PROCEDURE [quarry].[WidgetQuarryMaterialCounts]
(
	@CompanyID int
)
AS
BEGIN
	SET NOCOUNT ON;

    WITH cte AS (
      SELECT ROW_NUMBER() OVER (ORDER BY (COUNT(mat.MaterialId)) DESC) AS Seq, 
        qry.QuarryId, qry.QuarryName, COUNT(mat.MaterialId) AS MaterialCount
      FROM quarry.Material mat
		JOIN quarry.Quarry qry ON mat.QuarryId = qry.QuarryId
	  WHERE mat.CompanyId = @CompanyID
	    AND mat.DeletedInd = 0
      GROUP BY qry.QuarryId, qry.QuarryName
    )
    SELECT QuarryId, QuarryName, MaterialCount FROM cte WHERE Seq BETWEEN 1 AND 5
    UNION ALL
    SELECT 0, 'Others', SUM(MaterialCount) FROM cte WHERE Seq > 5

	SET NOCOUNT OFF
END
go

exec [quarry].[WidgetQuarryMaterialCounts] 4