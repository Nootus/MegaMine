IF OBJECTPROPERTY(OBJECT_ID('quarry.WidgetMaterialColourQuarryMaterialCounts'), N'IsProcedure') = 1
	DROP PROCEDURE [quarry].[WidgetMaterialColourQuarryMaterialCounts] 
GO

CREATE PROCEDURE [quarry].[WidgetMaterialColourQuarryMaterialCounts] 
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
	WHERE CompanyId = @CompanyId AND DeletedInd = 0 AND ProcessType = 1
	GROUP BY QuarryId
	ORDER BY COUNT(MaterialId) DESC;


	DECLARE @MaterialColourTop5 AS TABLE(MaterialColourId int)

	INSERT INTO @MaterialColourTop5(MaterialColourId)
	SELECT TOP 5 MaterialColourId 
	FROM quarry.Material
	WHERE CompanyId = @CompanyId AND DeletedInd = 0 AND ProcessType = 1
	GROUP BY MaterialColourId
	ORDER BY COUNT(MaterialId) DESC;

	SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = qry.QuarryName, X = mc.ColourName, Y = COUNT(mat.MaterialId), KeyOrder = 0, XOrder = 0
	FROM quarry.Material mat
	JOIN quarry.MaterialColour mc on mc.MaterialColourId = mat.MaterialColourId
	JOIN quarry.Quarry qry on qry.QuarryId = mat.QuarryId
	WHERE EXISTS(SELECT 1 FROM @MaterialColourTop5 mc5 WHERE mc5.MaterialColourId = mat.MaterialColourId)
	AND EXISTS(SELECT 1 FROM @QuarryTop5 q5 WHERE q5.QuarryId = mat.QuarryId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0 AND mat.ProcessType = 1
	GROUP BY mat.MaterialColourId, mc.ColourName, mat.QuarryId, qry.QuarryName
	UNION ALL
	SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = 'Other Quarries', X = mc.ColourName, Y = COUNT(mat.MaterialId), KeyOrder = 1, XOrder = 0
	FROM quarry.Material mat
	JOIN quarry.MaterialColour mc on mc.MaterialColourId = mat.MaterialColourId
	WHERE EXISTS(SELECT 1 FROM @MaterialColourTop5 mc5 WHERE mc5.MaterialColourId = mat.MaterialColourId)
	AND NOT EXISTS(SELECT 1 FROM @QuarryTop5 q5 WHERE q5.QuarryId = mat.QuarryId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0 AND mat.ProcessType = 1
	GROUP BY mat.MaterialColourId, mc.ColourName
	UNION ALL
	SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = qry.QuarryName, X = 'Others', Y = COUNT(mat.MaterialId), KeyOrder = 0, XOrder = 1
	FROM quarry.Material mat
	JOIN quarry.Quarry qry on qry.QuarryId = mat.QuarryId
	WHERE NOT EXISTS(SELECT 1 FROM @MaterialColourTop5 mc5 WHERE mc5.MaterialColourId = mat.MaterialColourId)
	AND EXISTS(SELECT 1 FROM @QuarryTop5 q5 WHERE q5.QuarryId = mat.QuarryId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0 AND mat.ProcessType = 1
	GROUP BY mat.QuarryId, qry.QuarryName
	UNION ALL
	SELECT Id = CONVERT(varchar(40), NEWID()), [Key] = 'Other Quarries', X = 'Others', Y = COUNT(mat.MaterialId), KeyOrder = 1, XOrder = 1
	FROM quarry.Material mat
	WHERE NOT EXISTS(SELECT 1 FROM @MaterialColourTop5 mc5 WHERE mc5.MaterialColourId = mat.MaterialColourId)
	AND NOT EXISTS(SELECT 1 FROM @QuarryTop5 q5 WHERE q5.QuarryId = mat.QuarryId)
	AND mat.CompanyId = @CompanyId AND mat.DeletedInd = 0 AND mat.ProcessType = 1
	HAVING COUNT(mat.MaterialId) > 0
	ORDER BY KeyOrder, [Key], XOrder, X

	SET NOCOUNT OFF
END
go
--exec [quarry].[WidgetMaterialColourQuarryMaterialCounts]  4;