IF OBJECTPROPERTY(OBJECT_ID('quarry.GetQuarrySummary'), N'IsProcedure') = 1
	DROP PROCEDURE [quarry].GetQuarrySummary
GO

CREATE PROCEDURE [quarry].[GetQuarrySummary]
(
	@CompanyId INT,
	@StartDate DATETIME,
	@EndDate DATETIME
)
AS
BEGIN

	SET NOCOUNT ON

	IF(@StartDate IS NULL)
	BEGIN
		SELECT @StartDate = MIN(MaterialDate) FROM quarry.Material WHERE CompanyId = @CompanyId
	END

	IF(	@EndDate IS NULL)
	BEGIN
		SELECT @EndDate = MAX(MaterialDate) FROM quarry.Material WHERE CompanyId = @CompanyId
	END
	ELSE
	BEGIN
		SELECT @EndDate = DATEADD(SECOND, -1, DATEADD(DAY, 1, @EndDate))
	END

	DECLARE @query NVARCHAR(4000);

	DECLARE @columnsQuantity NVARCHAR(500), @tempColumnsQuantity NVARCHAR(500),
		@totalsQuantity NVARCHAR(1000)
	SELECT @columnsQuantity = ISNULL(@columnsQuantity + ', ', '') + QUOTENAME(ProductTypeName),
		@tempColumnsQuantity = ISNULL(@tempColumnsQuantity + ', ', '') + QUOTENAME(ProductTypeName) + ' INT',
		@totalsQuantity = ISNULL(@totalsQuantity + ' + ', '') + 'COALESCE(' + QUOTENAME(ProductTypeName) + ', 0)'
	FROM quarry.ProductType 
	WHERE DeletedInd = 0 and CompanyId = @CompanyId
	AND ProcessTypeId = 1
	ORDER BY DisplayOrder;

	DECLARE @columnsWeight NVARCHAR(500), @tempColumnsWeight NVARCHAR(500),
		@totalsWeight NVARCHAR(1000)
	SELECT @columnsWeight = ISNULL(@columnsWeight + ', ', '') + QUOTENAME(ProductTypeName),
		@tempColumnsWeight = ISNULL(@tempColumnsWeight + ', ', '') + QUOTENAME(ProductTypeName) + ' DECIMAL',
		@totalsWeight = ISNULL(@totalsWeight + ' + ', '') + 'COALESCE(' + QUOTENAME(ProductTypeName) + ', 0)'
	FROM quarry.ProductType 
	WHERE DeletedInd = 0 and CompanyId = @CompanyId
	AND ProcessTypeId = 2
	ORDER BY DisplayOrder;

	CREATE TABLE #Quarry
	(
	   QuarryId INT,
	   QuarryName NVARCHAR(200),
	   Colours NVARCHAR(2000)
	);

	WITH QuarryColours AS 
	(
		SELECT q.QuarryId, QuarryName, ColourName
		FROM quarry.QuarryMaterialColour qmc
		INNER JOIN Quarry q ON qmc.QuarryId = q.QuarryId
		INNER JOIN MaterialColour mc ON qmc.MaterialColourId = mc.MaterialColourId
		WHERE q.DeletedInd = 0 AND q.CompanyId = @CompanyId
	)
	INSERT INTO #Quarry
	SELECT QuarryId, QuarryName,  
		Colours = STUFF((SELECT ',' + qc1.ColourName FROM QuarryColours qc1 WHERE qc1.QuarryName = qc2.QuarryName FOR XML PATH('')),1,1,'')
	FROM QuarryColours as qc2
	GROUP BY qc2.QuarryName, qc2.QuarryId;

	-- ProcessType (Cutting) dynamic query
	CREATE TABLE #QuarryQuantity
	(
	   QuarryId INT,
	   QuarryName NVARCHAR(200),
	   Colours NVARCHAR(2000),
	);

	SELECT @query = 'ALTER TABLE #QuarryQuantity ADD ' + @tempColumnsQuantity + ', TotalQuantity INT';
	EXECUTE sp_executesql @query

	SELECT @query = '
	WITH SummaryQuantity AS
	(
		SELECT q.QuarryId, QuarryName, q.Colours, pt.ProductTypeName, MaterialQuantity = COUNT(MaterialId)
		FROM #Quarry q
		LEFT JOIN quarry.Material m ON q.QuarryId = m.QuarryId
		LEFT JOIN quarry.ProductType pt ON m.ProductTypeId = pt.ProductTypeId 
		WHERE MaterialDate BETWEEN ''' + CONVERT(VARCHAR(50), @StartDate, 121) + ''' AND ''' + CONVERT(VARCHAR(50), @EndDate, 121) + '''
		AND m.ProcessTypeId = 1
		GROUP BY pt.ProductTypeName, QuarryName, q.QuarryId, q.Colours
	)
	INSERT INTO #QuarryQuantity
	SELECT QuarryId, QuarryName, Colours, ' + @columnsQuantity + ', TotalQuantity = ' + @totalsQuantity + ' FROM SummaryQuantity
	PIVOT(SUM(MaterialQuantity) FOR ProductTypeName IN (' + @columnsQuantity + ')) AS SummaryQuantityPivot'

	EXECUTE sp_executesql @query

	-- ProcessType (Cutting) dynamic query
	CREATE TABLE #QuarryWeight
	(
	   QuarryId INT,
	   QuarryName NVARCHAR(200),
	   Colours NVARCHAR(2000),
	);

	SELECT @query = 'ALTER TABLE #QuarryWeight ADD ' + @tempColumnsWeight + ', TotalWeight DECIMAL(10, 3)';
	EXECUTE sp_executesql @query

	SELECT @query = '
	WITH SummaryWeight AS
	(
		SELECT q.QuarryId, QuarryName, q.Colours, pt.ProductTypeName, MaterialWeight = SUM(m.Weight)
		FROM #Quarry q
		LEFT JOIN quarry.Material m ON q.QuarryId = m.QuarryId
		LEFT JOIN quarry.ProductType pt ON m.ProductTypeId = pt.ProductTypeId 
		WHERE MaterialDate BETWEEN ''' + CONVERT(VARCHAR(50), @StartDate, 121) + ''' AND ''' + CONVERT(VARCHAR(50), @EndDate, 121) + '''
		AND m.ProcessTypeId = 2
		GROUP BY pt.ProductTypeName, QuarryName, q.QuarryId, q.Colours
	)
	INSERT INTO #Quarryweight
	SELECT QuarryId, QuarryName, Colours, ' + @columnsWeight + ', TotalWeight = ' + @totalsWeight + ' FROM SummaryWeight
	PIVOT(SUM(MaterialWeight) FOR ProductTypeName IN (' + @columnsWeight + ')) AS SummaryWeightPivot'

	EXECUTE sp_executesql @query


	SELECT @query = '
	SELECT QuarryId = COALESCE(qty.QuarryId, wt.QuarryId), QuarryName= COALESCE(qty.QuarryName, wt.QuarryName),
			Colours = COALESCE(qty.Colours, wt.Colours), ' + @columnsQuantity + ', TotalQuantity, ' 
			+ @columnsWeight + ', TotalWeight 
			FROM #QuarryQuantity AS qty FULL JOIN #QuarryWeight AS wt ON qty.QuarryId = wt.QuarryId
			ORDER BY QuarryName'

	EXECUTE sp_executesql @query

	DROP TABLE #Quarry
	DROP TABLE #QuarryQuantity
	DROP TABLE #QuarryWeight
	SET NOCOUNT OFF
END
GO


