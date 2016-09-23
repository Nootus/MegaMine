//-------------------------------------------------------------------------------------------------
// <copyright file="QuarryTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Tests for Quarry section in Quarry
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Tests.Controllers.QuarryController
{
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Core.Models.Dashboard;
    using Core.Models.Web;
    using Core.Models.Widget;
    using Entities;
    using Models;
    using Moq;
    using Services.Widget.Entities;
    using Xunit;

    public class QuarryTest : QuarryControllerTest
    {
        [Fact]
        public async void Dashboard()
        {
            // Arrange
            // mock data for dashboard stored procedure
            this.QuarryDbContext.ChartEntities.AddRange(
            new ChartEntity<string, int>() { Id = "WidgetQuarryMaterialCounts-1", Key = "Pie", X = "QM1", Y = 100, KeyOrder = 0, XOrder = 1 },
            new ChartEntity<string, int>() { Id = "WidgetQuarryMaterialCounts-2", Key = "Pie", X = "QM2", Y = 200, KeyOrder = 0, XOrder = 2 },
            new ChartEntity<string, int>() { Id = "WidgetQuarryProductTypeMaterialCounts-1", Key = "Slab", X = "QM1", Y = 100, KeyOrder = 0, XOrder = 1 },
            new ChartEntity<string, int>() { Id = "WidgetQuarryProductTypeMaterialCounts-2", Key = "Slab", X = "QM2", Y = 200, KeyOrder = 0, XOrder = 2 },
            new ChartEntity<string, int>() { Id = "WidgetQuarryMaterialColourMaterialCounts-1", Key = "White", X = "QM1", Y = 100, KeyOrder = 0, XOrder = 1 },
            new ChartEntity<string, int>() { Id = "WidgetQuarryMaterialColourMaterialCounts-2", Key = "White", X = "QM2", Y = 200, KeyOrder = 0, XOrder = 2 });

            // Dashboard data
            this.AppContext.DashboardPageId = 97;

            // widget context entities
            this.WidgetDbContext.Dashboards.Add(new DashboardEntity() { DashboardId = 4, PageId = 97 });
            this.WidgetDbContext.DashboardWidgets.AddRange(
                    new DashboardWidgetEntity() { DashboardWidgetId = 1, DashboardId = 4, WidgetId = 1 },
                    new DashboardWidgetEntity() { DashboardWidgetId = 2, DashboardId = 4, WidgetId = 2 },
                    new DashboardWidgetEntity() { DashboardWidgetId = 3, DashboardId = 4, WidgetId = 3 });
            this.WidgetDbContext.Widgets.AddRange(
                    new WidgetEntity() { WidgetId = 1, Name = "Blocks Per Quarry", Claim = "Quarry:Claim", SizeX = 2, SizeY = 2, ChartTypeId = 2, XAxisLabel = "Top Quarries", YAxisLabel = "Blocks" },
                    new WidgetEntity() { WidgetId = 2, Name = "Blocks Per Quarry & Product Types", Claim = "Quarry:Claim", SizeX = 4, SizeY = 2, ChartTypeId = 4, XAxisLabel = "Top Quarries", YAxisLabel = "Blocks" },
                    new WidgetEntity() { WidgetId = 3, Name = "Blocks Per Quarry & Colour", Claim = "Quarry:Claim", SizeX = 6, SizeY = 1, ChartTypeId = 3, XAxisLabel = "Top Quarries", YAxisLabel = "Blocks" });
            this.WidgetDbContext.ChartTypes.AddRange(
                    new ChartTypeEntity() { ChartTypeId = 2, Type = "pieChart" },
                    new ChartTypeEntity() { ChartTypeId = 3, Type = "lineChart" },
                    new ChartTypeEntity() { ChartTypeId = 4, Type = "multiBarChart" });
            this.WidgetDbContext.DashboardPageWidgets.AddRange(
                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 1, DashboardId = 4, WidgetId = 1, Columns = 4, Rows = 0, SizeX = 2, SizeY = 2, CompanyId = 1 },
                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 2, DashboardId = 4, WidgetId = 2, Columns = 0, Rows = 0, SizeX = 4, SizeY = 2, CompanyId = 1 },
                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 3, DashboardId = 4, WidgetId = 3, Columns = 0, Rows = 2, SizeX = 6, SizeY = 1, CompanyId = 1 });

            await this.SaveChangesAsync(this.QuarryDbContext, this.WidgetDbContext);

            // Mocking stored procedure
            var moqChartSp = Mock.Get(this.QuarryDbContext);
            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetQuarryMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetQuarryMaterialCounts")));
            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetQuarryProductTypeMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetQuarryProductTypeMaterialCounts")));
            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetQuarryMaterialColourMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetQuarryMaterialColourMaterialCounts")));

            // Act
            AjaxModel<object> ajaxModel = await this.Controller.Dashboard();
            DashboardModel dashboard = ajaxModel.Dashboard;

            // Assert
            Assert.Null(ajaxModel.Model);
            Assert.Empty(ajaxModel.Message);

            Assert.Equal(dashboard.AllWidgets.Count, 3);
            Assert.Equal(dashboard.PageWidgets.Count, 3);
            Assert.Equal(dashboard.PageWidgets[1].WidgetId, 1);
            Assert.Equal(dashboard.AllWidgets[1].WidgetId, 2);
            Assert.Equal(dashboard.AllWidgets[1].Chart.Type, "multiBarChart");
            Assert.Equal(((ChartModel<string, int>)dashboard.AllWidgets[1].Chart.Model).Data[0].Values[1].Y, 200);
        }

        [Fact]
        public async void QuarriesGet()
        {
            // Arrange
            // adding Quarries
            this.QuarryDbContext.Quarries.AddRange(
                    new QuarryEntity() { QuarryId = 1, QuarryName = "QM1", CompanyId = 1, DeletedInd = false },
                    new QuarryEntity() { QuarryId = 2, QuarryName = "QM2", CompanyId = 1, DeletedInd = false });

            // mock data for dashboard stored procedure
            this.QuarryDbContext.ChartEntities.AddRange(
            new ChartEntity<string, int>() { Id = "WidgetQuarryMaterialCounts-1", Key = "Pie", X = "QM1", Y = 100, KeyOrder = 0, XOrder = 1 },
            new ChartEntity<string, int>() { Id = "WidgetQuarryMaterialCounts-2", Key = "Pie", X = "QM2", Y = 200, KeyOrder = 0, XOrder = 2 },
            new ChartEntity<string, int>() { Id = "WidgetQuarryProductTypeMaterialCounts-1", Key = "Slab", X = "QM1", Y = 100, KeyOrder = 0, XOrder = 1 },
            new ChartEntity<string, int>() { Id = "WidgetQuarryProductTypeMaterialCounts-2", Key = "Slab", X = "QM2", Y = 200, KeyOrder = 0, XOrder = 2 },
            new ChartEntity<string, int>() { Id = "WidgetQuarryMaterialColourMaterialCounts-1", Key = "White", X = "QM1", Y = 100, KeyOrder = 0, XOrder = 1 },
            new ChartEntity<string, int>() { Id = "WidgetQuarryMaterialColourMaterialCounts-2", Key = "White", X = "QM2", Y = 200, KeyOrder = 0, XOrder = 2 });

            // Dashboard data
            this.AppContext.DashboardPageId = 10;

            // widget context entities
            this.WidgetDbContext.Dashboards.Add(new DashboardEntity() { DashboardId = 1, PageId = 10 });
            this.WidgetDbContext.DashboardWidgets.AddRange(
                    new DashboardWidgetEntity() { DashboardWidgetId = 1, DashboardId = 1, WidgetId = 1 },
                    new DashboardWidgetEntity() { DashboardWidgetId = 2, DashboardId = 1, WidgetId = 2 },
                    new DashboardWidgetEntity() { DashboardWidgetId = 3, DashboardId = 1, WidgetId = 3 });
            this.WidgetDbContext.Widgets.AddRange(
                    new WidgetEntity() { WidgetId = 1, Name = "Blocks Per Quarry", Claim = "Quarry:Claim", SizeX = 2, SizeY = 2, ChartTypeId = 2, XAxisLabel = "Top Quarries", YAxisLabel = "Blocks" },
                    new WidgetEntity() { WidgetId = 2, Name = "Blocks Per Quarry & Product Types", Claim = "Quarry:Claim", SizeX = 4, SizeY = 2, ChartTypeId = 4, XAxisLabel = "Top Quarries", YAxisLabel = "Blocks" },
                    new WidgetEntity() { WidgetId = 3, Name = "Blocks Per Quarry & Colour", Claim = "Quarry:Claim", SizeX = 6, SizeY = 1, ChartTypeId = 3, XAxisLabel = "Top Quarries", YAxisLabel = "Blocks" });
            this.WidgetDbContext.ChartTypes.AddRange(
                    new ChartTypeEntity() { ChartTypeId = 2, Type = "pieChart" },
                    new ChartTypeEntity() { ChartTypeId = 3, Type = "lineChart" },
                    new ChartTypeEntity() { ChartTypeId = 4, Type = "multiBarChart" });
            this.WidgetDbContext.DashboardPageWidgets.AddRange(
                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 1, DashboardId = 1, WidgetId = 1, Columns = 4, Rows = 0, SizeX = 2, SizeY = 2, CompanyId = 1 },
                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 2, DashboardId = 1, WidgetId = 2, Columns = 0, Rows = 0, SizeX = 4, SizeY = 2, CompanyId = 1 },
                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 3, DashboardId = 1, WidgetId = 3, Columns = 0, Rows = 2, SizeX = 6, SizeY = 1, CompanyId = 1 });

            await this.SaveChangesAsync(this.QuarryDbContext, this.WidgetDbContext);

            // Mocking stored procedure
            var moqChartSp = Mock.Get(this.QuarryDbContext);
            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetQuarryMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetQuarryMaterialCounts")));
            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetQuarryProductTypeMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetQuarryProductTypeMaterialCounts")));
            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetQuarryMaterialColourMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetQuarryMaterialColourMaterialCounts")));

            // Act
            AjaxModel<List<QuarryModel>> ajaxModel = await this.Controller.QuarriesGet();
            List<QuarryModel> quarries = ajaxModel.Model;
            DashboardModel dashboard = ajaxModel.Dashboard;

            // Assert
            Assert.Equal(quarries.Count, 2);
            Assert.Equal(quarries[1].QuarryName, "QM2");

            Assert.Equal(dashboard.AllWidgets.Count, 3);
            Assert.Equal(dashboard.PageWidgets.Count, 3);
            Assert.Equal(dashboard.PageWidgets[1].WidgetId, 1);
            Assert.Equal(dashboard.AllWidgets[1].WidgetId, 2);
            Assert.Equal(dashboard.AllWidgets[1].Chart.Type, "multiBarChart");
            Assert.Equal(((ChartModel<string, int>)dashboard.AllWidgets[1].Chart.Model).Data[0].Values[1].Y, 200);
        }

        [Fact]
        public async void QuarryAdd()
        {
            // Arrange
            this.QuarryDbContext.MaterialColours.AddRange(
                    new MaterialColourEntity() { MaterialColourId = 1, ColourName = "White", CompanyId = 1, DeletedInd = false },
                    new MaterialColourEntity() { MaterialColourId = 2, ColourName = "Smoky", CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.QuarryDbContext);

            QuarryModel model = new QuarryModel() { QuarryId = 0, QuarryName = "QM1", ColourIds = new List<int>() { 1, 2 } };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.QuarryUpdate(model);

            // Assert
            QuarryEntity quarryEntity = this.QuarryDbContext.Quarries.Last();
            Assert.Equal(quarryEntity.QuarryName, "QM1");

            YardEntity yardEntity = this.QuarryDbContext.Yards.Last();
            Assert.Equal(yardEntity.YardName, "QM1 Yard");

            List<QuarryMaterialColourEntity> quarryColours = this.QuarryDbContext.QuarryMaterialColours.ToList();
            Assert.Equal(quarryColours.Count, 2);
            Assert.Equal(quarryColours[1].MaterialColourId, 2);

            Assert.Equal(ajaxModel.Message, QuarryMessages.QuarrySaveSuccess);
        }

        [Fact]
        public async void QuarryUpdate()
        {
            // Arrange
            this.QuarryDbContext.Quarries.AddRange(
                    new QuarryEntity() { QuarryId = 1, QuarryName = "QM1", CompanyId = 1, DeletedInd = false },
                    new QuarryEntity() { QuarryId = 2, QuarryName = "QM2", CompanyId = 1, DeletedInd = false });

            this.QuarryDbContext.Yards.AddRange(
                    new YardEntity() { YardId = 1, YardName = "QM1 Yard", QuarryId = 1, CompanyId = 1, DeletedInd = false },
                    new YardEntity() { YardId = 2, YardName = "QM2 Yard", QuarryId = 2, CompanyId = 1, DeletedInd = false });

            this.QuarryDbContext.MaterialColours.AddRange(
                    new MaterialColourEntity() { MaterialColourId = 1, ColourName = "White", CompanyId = 1, DeletedInd = false },
                    new MaterialColourEntity() { MaterialColourId = 2, ColourName = "Smoky", CompanyId = 1, DeletedInd = false });

            this.QuarryDbContext.QuarryMaterialColours.AddRange(
                    new QuarryMaterialColourEntity() { QuarryMaterialColourId = 1, QuarryId = 2, MaterialColourId = 1, CompanyId = 1, DeletedInd = false },
                    new QuarryMaterialColourEntity() { QuarryMaterialColourId = 2, QuarryId = 2, MaterialColourId = 2, CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.QuarryDbContext);

            QuarryModel model = new QuarryModel() { QuarryId = 2, QuarryName = "QM15", ColourIds = new List<int>() { 2 } };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.QuarryUpdate(model);

            // Assert
            QuarryEntity quarryEntity = this.QuarryDbContext.Quarries.Where(e => e.QuarryId == 2).First();
            Assert.Equal(quarryEntity.QuarryName, "QM15");

            YardEntity yardEntity = this.QuarryDbContext.Yards.Where(e => e.QuarryId == 2).First();
            Assert.Equal(yardEntity.YardName, "QM15 Yard");

            List<QuarryMaterialColourEntity> quarryColours = this.QuarryDbContext.QuarryMaterialColours.ToList();
            Assert.Equal(quarryColours.Count, 1);
            Assert.Equal(quarryColours[0].MaterialColourId, 2);

            Assert.Equal(ajaxModel.Message, QuarryMessages.QuarrySaveSuccess);
        }

        [Fact]
        public async void QuarryDelete()
        {
            // Arrange
            this.QuarryDbContext.Quarries.AddRange(
                    new QuarryEntity() { QuarryId = 1, QuarryName = "QM1", CompanyId = 1, DeletedInd = false },
                    new QuarryEntity() { QuarryId = 2, QuarryName = "QM2", CompanyId = 1, DeletedInd = false });

            this.QuarryDbContext.Yards.AddRange(
                    new YardEntity() { YardId = 1, YardName = "QM1 Yard", QuarryId = 1, CompanyId = 1, DeletedInd = false },
                    new YardEntity() { YardId = 2, YardName = "QM2 Yard", QuarryId = 2, CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.QuarryDbContext);

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.QuarryDelete(2);

            // Assert
            QuarryEntity quarryEntity = this.QuarryDbContext.Quarries.Where(e => e.QuarryId == 2).First();
            Assert.Equal(quarryEntity.DeletedInd, true);

            YardEntity yardEntity = this.QuarryDbContext.Yards.Where(e => e.QuarryId == 2).First();
            Assert.Equal(yardEntity.DeletedInd, true);

            Assert.Equal(ajaxModel.Message, QuarryMessages.QuarryDeleteSuccess);
        }
    }
}
