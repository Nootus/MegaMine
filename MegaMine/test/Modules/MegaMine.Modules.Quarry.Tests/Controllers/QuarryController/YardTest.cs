//-------------------------------------------------------------------------------------------------
// <copyright file="YardTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Tests for Yard section in Quarry
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

    public class YardTest : QuarryControllerTest
    {
        [Fact]
        public async void YardListGet()
        {
            // Arrange
            this.QuarryDbContext.Yards.AddRange(
                    new YardEntity() { YardId = 1, YardName = "Central Yard", CompanyId = 1, DeletedInd = false },
                    new YardEntity() { YardId = 2, YardName = "NDB Central Yard", CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.QuarryDbContext);

            // Act
            AjaxModel<List<YardModel>> ajaxModel = await this.Controller.YardListGet();
            List<YardModel> yards = ajaxModel.Model;

            // Assert
            Assert.Equal(yards.Count, 2);
            Assert.Equal(yards[1].YardName, "NDB Central Yard");
        }

        [Fact]
        public async void YardsGet()
        {
            // Arrange
            // adding Yards
            this.QuarryDbContext.Yards.AddRange(
                    new YardEntity() { YardId = 1, YardName = "Central Yard", CompanyId = 1, DeletedInd = false },
                    new YardEntity() { YardId = 2, YardName = "NDB Central Yard", CompanyId = 1, DeletedInd = false });

            // mock data for dashboard stored procedure
            this.QuarryDbContext.ChartEntities.AddRange(
            new ChartEntity<string, int>() { Id = "WidgetYardMaterialCounts-1", Key = "Pie", X = "QM1 Yard", Y = 100, KeyOrder = 0, XOrder = 1 },
            new ChartEntity<string, int>() { Id = "WidgetYardMaterialCounts-2", Key = "Pie", X = "QM2 Yard", Y = 200, KeyOrder = 0, XOrder = 2 },
            new ChartEntity<string, int>() { Id = "WidgetYardProductTypeMaterialCounts-1", Key = "Slab", X = "QM1 Yard", Y = 100, KeyOrder = 0, XOrder = 1 },
            new ChartEntity<string, int>() { Id = "WidgetYardProductTypeMaterialCounts-2", Key = "Slab", X = "QM2 Yard", Y = 200, KeyOrder = 0, XOrder = 2 });

            // Dashboard data
            this.AppContext.DashboardPageId = 11;

            // widget context entities
            this.WidgetDbContext.Dashboards.Add(new DashboardEntity() { DashboardId = 5, PageId = 11 });
            this.WidgetDbContext.DashboardWidgets.AddRange(
                    new DashboardWidgetEntity() { DashboardWidgetId = 16, DashboardId = 5, WidgetId = 10 },
                    new DashboardWidgetEntity() { DashboardWidgetId = 17, DashboardId = 5, WidgetId = 11 });
            this.WidgetDbContext.Widgets.AddRange(
                    new WidgetEntity() { WidgetId = 10, Name = "Blocks Per Yard", Claim = "Quarry:Claim", SizeX = 2, SizeY = 2, ChartTypeId = 2, XAxisLabel = "Top Yards", YAxisLabel = "Blocks" },
                    new WidgetEntity() { WidgetId = 11, Name = "Blocks Per Yard & Product Types", Claim = "Quarry:Claim", SizeX = 4, SizeY = 2, ChartTypeId = 4, XAxisLabel = "Top Yards", YAxisLabel = "Blocks" });
            this.WidgetDbContext.ChartTypes.AddRange(
                    new ChartTypeEntity() { ChartTypeId = 2, Type = "pieChart" },
                    new ChartTypeEntity() { ChartTypeId = 4, Type = "multiBarChart" });
            this.WidgetDbContext.DashboardPageWidgets.AddRange(
                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 16, DashboardId = 5, WidgetId = 10, Columns = 0, Rows = 0, SizeX = 2, SizeY = 2, CompanyId = 1 },
                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 17, DashboardId = 5, WidgetId = 11, Columns = 2, Rows = 0, SizeX = 4, SizeY = 2, CompanyId = 1 });

            await this.SaveChangesAsync(this.QuarryDbContext, this.WidgetDbContext);

            // Mocking stored procedure
            var moqChartSp = Mock.Get(this.QuarryDbContext);
            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetYardMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetYardMaterialCounts")));
            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetYardProductTypeMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetYardProductTypeMaterialCounts")));

            // Act
            AjaxModel<List<YardModel>> ajaxModel = await this.Controller.YardsGet();
            List<YardModel> yards = ajaxModel.Model;
            DashboardModel dashboard = ajaxModel.Dashboard;

            // Assert
            Assert.Equal(yards.Count, 2);
            Assert.Equal(yards[1].YardName, "NDB Central Yard");

            Assert.Equal(dashboard.AllWidgets.Count, 2);
            Assert.Equal(dashboard.PageWidgets.Count, 2);
            Assert.Equal(dashboard.PageWidgets[1].WidgetId, 11);
            Assert.Equal(dashboard.AllWidgets[1].WidgetId, 11);
            Assert.Equal(dashboard.AllWidgets[1].Chart.Type, "multiBarChart");
            Assert.Equal(((ChartModel<string, int>)dashboard.AllWidgets[1].Chart.Model).Data[0].Values[1].Y, 200);
        }

        [Fact]
        public async void YardAdd()
        {
            // Arrange
            YardModel model = new YardModel() { YardId = 0, YardName = "Central Yard" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.YardAdd(model);

            // Assert
            YardEntity entity = this.QuarryDbContext.Yards.Last();
            Assert.Equal(entity.YardName, "Central Yard");
            Assert.Equal(ajaxModel.Message, QuarryMessages.YardSaveSuccess);
        }

        [Fact]
        public async void YardUpdate()
        {
            // Arrange
            this.QuarryDbContext.Yards.AddRange(
                    new YardEntity() { YardId = 1, YardName = "Central Yard", CompanyId = 1, DeletedInd = false },
                    new YardEntity() { YardId = 2, YardName = "NDB Central Yard", CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.QuarryDbContext);

            YardModel model = new YardModel() { YardId = 2, YardName = "New Yard" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.YardUpdate(model);

            // Assert
            YardEntity entity = this.QuarryDbContext.Yards.Where(e => e.YardId == 2).First();
            Assert.Equal(entity.YardName, "New Yard");
            Assert.Equal(ajaxModel.Message, QuarryMessages.YardSaveSuccess);
        }

        [Fact]
        public async void YardDelete()
        {
            // Arrange
            this.QuarryDbContext.Yards.AddRange(
                    new YardEntity() { YardId = 1, YardName = "Central Yard", CompanyId = 1, DeletedInd = false },
                    new YardEntity() { YardId = 2, YardName = "NDB Central Yard", CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.QuarryDbContext);

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.YardDelete(2);

            // Assert
            YardEntity entity = this.QuarryDbContext.Yards.Where(e => e.YardId == 2).First();
            Assert.Equal(entity.DeletedInd, true);
            Assert.Equal(ajaxModel.Message, QuarryMessages.YardDeleteSuccess);
        }
    }
}
