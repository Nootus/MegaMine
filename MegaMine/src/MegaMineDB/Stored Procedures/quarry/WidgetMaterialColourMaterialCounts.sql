IF OBJECTPROPERTY(OBJECT_ID('quarry.WidgetMaterialColourMaterialCounts'), N'IsProcedure') = 1
	DROP PROCEDURE [quarry].[WidgetMaterialColourMaterialCounts] 
GO

CREATE PROCEDURE [quarry].[WidgetMaterialColourMaterialCounts]
(
	@CompanyID int
)
AS
BEGIN
	SET NOCOUNT ON;

    WITH cte AS (
      SELECT ROW_NUMBER() OVER (ORDER BY (COUNT(mat.MaterialId)) DESC) AS Seq, 
        mc.MaterialColourId, mc.ColourName, COUNT(mat.MaterialId) AS MaterialCount, XOrder = 0
      FROM quarry.Material mat
		JOIN quarry.MaterialColour mc ON mat.MaterialColourId = mc.MaterialColourId
	  WHERE mat.CompanyId = @CompanyID
	    AND mat.DeletedInd = 0
      GROUP BY mc.MaterialColourId, mc.ColourName
    )
    SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = 'Key', X = ColourName, Y = MaterialCount, KeyOrder = 0, xOrder = 0 FROM cte WHERE Seq BETWEEN 1 AND 5
    UNION ALL
    SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = 'Key', X = 'Others', Y = SUM(MaterialCount), KeyOrder = 1, xOrder = 1 FROM cte WHERE Seq > 5
	HAVING SUM(MaterialCount) IS NOT NULL
	ORDER BY KeyOrder, [Key], XOrder, X

	SET NOCOUNT OFF
END
go

--exec [quarry].[WidgetMaterialColourMaterialCounts] 4