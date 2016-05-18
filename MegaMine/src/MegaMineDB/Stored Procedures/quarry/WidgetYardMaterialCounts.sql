IF OBJECTPROPERTY(OBJECT_ID('quarry.WidgetYardMaterialCounts'), N'IsProcedure') = 1
	DROP PROCEDURE [quarry].[WidgetYardMaterialCounts] 
GO

CREATE PROCEDURE [quarry].[WidgetYardMaterialCounts]
(
	@CompanyID int
)
AS
BEGIN
	SET NOCOUNT ON;

    WITH cte AS (
      SELECT ROW_NUMBER() OVER (ORDER BY (COUNT(mat.MaterialId)) DESC) AS Seq, 
        yrd.YardId, yrd.YardName, COUNT(mat.MaterialId) AS MaterialCount
      FROM quarry.Material mat
		JOIN quarry.Yard yrd ON mat.YardId = yrd.YardId
	  WHERE mat.CompanyId = @CompanyID
	    AND mat.DeletedInd = 0
      GROUP BY yrd.YardId, yrd.YardName
    )
    SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = 'Pie', X = YardName, Y = MaterialCount, KeyOrder = 0, XOrder = 0 FROM cte WHERE Seq BETWEEN 1 AND 5
    UNION ALL
    SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = 'Pie', X = 'Others', Y = SUM(MaterialCount), KeyOrder = 0, XOrder = 1 FROM cte WHERE Seq > 5
	HAVING SUM(MaterialCount) IS NOT NULL
	ORDER BY KeyOrder, [Key], XOrder, X

	SET NOCOUNT OFF
END
go

--exec [quarry].[WidgetYardMaterialCounts] 4