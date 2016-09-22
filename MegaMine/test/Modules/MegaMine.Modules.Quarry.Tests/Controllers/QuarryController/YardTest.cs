////-------------------------------------------------------------------------------------------------
//// <copyright file="YardTest.cs" company="Nootus">
////  Copyright (c) Nootus. All rights reserved.
//// </copyright>
//// <description>
////  Tests for Yard section in Quarry
//// </description>
////-------------------------------------------------------------------------------------------------
//namespace MegaMine.Modules.Quarry.Tests.Controllers.QuarryController
//{
//    using System.Collections.Generic;
//    using System.Linq;
//    using Common;
//    using Core.Models.Dashboard;
//    using Core.Models.Web;
//    using Core.Models.Widget;
//    using Entities;
//    using Models;
//    using Moq;
//    using Services.Widget.Entities;
//    using Xunit;

//    public class YardTest : QuarryControllerTest
//    {
//        [Fact]
//        public async void YardListGet()
//        {
//            // Arrange
//            this.QuarryDbContext.Yards.AddRange(
//                    new YardEntity() { YardId = 1, YardName = "Central Yard", CompanyId = 1, DeletedInd = false },
//                    new YardEntity() { YardId = 2, YardName = "NDB Central Yard", CompanyId = 1, DeletedInd = false });
//            await this.SaveChangesAsync(this.QuarryDbContext);

//            // Act
//            AjaxModel<List<YardModel>> ajaxModel = await this.Controller.YardListGet();
//            List<YardModel> Yards = ajaxModel.Model;

//            // Assert
//            Assert.Equal(Yards.Count, 2);
//            Assert.Equal(Yards[1].YardName, "NDB Central Yard");
//        }

//        [Fact]
//        public async void YardsGet()
//        {
//            // Arrange
//            // adding Product Types
//            this.QuarryDbContext.Yards.AddRange(
//                    new YardEntity() { YardId = 1, YardName = "Central Yard", CompanyId = 1, DeletedInd = false },
//                    new YardEntity() { YardId = 2, YardName = "NDB Central Yard", CompanyId = 1, DeletedInd = false });

//            // mock data for dashboard stored procedure
//            this.QuarryDbContext.ChartEntities.AddRange(
//            new ChartEntity<string, int>() { Id = "WidgetYardMaterialCounts-1", Key = "Key", X = "Slab", Y = 100, KeyOrder = 0, XOrder = 1 },
//            new ChartEntity<string, int>() { Id = "WidgetYardMaterialCounts-2", Key = "Key", X = "Tile", Y = 200, KeyOrder = 0, XOrder = 2 },
//            new ChartEntity<string, int>() { Id = "WidgetYardQuarryMaterialCounts-1", Key = "QM1", X = "Slab", Y = 100, KeyOrder = 0, XOrder = 1 },
//            new ChartEntity<string, int>() { Id = "WidgetYardQuarryMaterialCounts-2", Key = "QM1", X = "Tile", Y = 200, KeyOrder = 0, XOrder = 2 },
//            new ChartEntity<string, int>() { Id = "WidgetYardMaterialColourMaterialCounts-1", Key = "Multi-Color", X = "Slab", Y = 100, KeyOrder = 0, XOrder = 1 },
//            new ChartEntity<string, int>() { Id = "WidgetYardMaterialColourMaterialCounts-2", Key = "Multi-Color", X = "Tile", Y = 200, KeyOrder = 0, XOrder = 2 });

//            // Dashboard data
//            this.AppContext.DashboardPageId = 56;

//            // widget context entities
//            this.WidgetDbContext.Dashboards.Add(new DashboardEntity() { DashboardId = 2, PageId = 56 });
//            this.WidgetDbContext.DashboardWidgets.AddRange(
//                    new DashboardWidgetEntity() { DashboardWidgetId = 4, DashboardId = 2, WidgetId = 4 },
//                    new DashboardWidgetEntity() { DashboardWidgetId = 5, DashboardId = 2, WidgetId = 5 },
//                    new DashboardWidgetEntity() { DashboardWidgetId = 6, DashboardId = 2, WidgetId = 6 });
//            this.WidgetDbContext.Widgets.AddRange(
//                    new WidgetEntity() { WidgetId = 4, Name = "Blocks Per Product Type", Claim = "Quarry:Claim", SizeX = 3, SizeY = 2, ChartTypeId = 1, XAxisLabel = "Product Types", YAxisLabel = "Blocks" },
//                    new WidgetEntity() { WidgetId = 5, Name = "Blocks Per Product Types & Quarry", Claim = "Quarry:Claim", SizeX = 3, SizeY = 2, ChartTypeId = 4, XAxisLabel = "Product Types", YAxisLabel = "Blocks" },
//                    new WidgetEntity() { WidgetId = 6, Name = "Blocks Per Product Type & Colour", Claim = "Quarry:Claim", SizeX = 6, SizeY = 1, ChartTypeId = 6, XAxisLabel = "Product Types", YAxisLabel = "Blocks" });
//            this.WidgetDbContext.ChartTypes.AddRange(
//                    new ChartTypeEntity() { ChartTypeId = 1, Type = "discreteBarChart" },
//                    new ChartTypeEntity() { ChartTypeId = 4, Type = "multiBarChart" },
//                    new ChartTypeEntity() { ChartTypeId = 6, Type = "stackedAreaChart" });
//            this.WidgetDbContext.DashboardPageWidgets.AddRange(
//                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 4, DashboardId = 2, WidgetId = 4, Columns = 0, Rows = 0, SizeX = 3, SizeY = 2, CompanyId = 1 },
//                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 5, DashboardId = 2, WidgetId = 5, Columns = 3, Rows = 0, SizeX = 3, SizeY = 2, CompanyId = 1 },
//                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 6, DashboardId = 2, WidgetId = 6, Columns = 0, Rows = 2, SizeX = 6, SizeY = 1, CompanyId = 1 });

//            await this.SaveChangesAsync(this.QuarryDbContext, this.WidgetDbContext);

//            // Mocking stored procedure
//            var moqChartSp = Mock.Get(this.QuarryDbContext);
//            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetYardMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
//                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetYardMaterialCounts")));
//            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetYardQuarryMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
//                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetYardQuarryMaterialCounts")));
//            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetYardMaterialColourMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
//                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetYardMaterialColourMaterialCounts")));

//            // Act
//            AjaxModel<List<YardModel>> ajaxModel = await this.Controller.YardsGet();
//            List<YardModel> Yards = ajaxModel.Model;
//            DashboardModel dashboard = ajaxModel.Dashboard;

//            // Assert
//            Assert.Equal(Yards.Count, 2);
//            Assert.Equal(Yards[1].YardName, "Tile");

//            Assert.Equal(dashboard.AllWidgets.Count, 3);
//            Assert.Equal(dashboard.PageWidgets.Count, 3);
//            Assert.Equal(dashboard.PageWidgets[1].WidgetId, 5);
//            Assert.Equal(dashboard.AllWidgets[1].WidgetId, 5);
//            Assert.Equal(dashboard.AllWidgets[1].Chart.Type, "multiBarChart");
//        }

//        [Fact]
//        public async void YardAdd()
//        {
//            // Arrange
//            YardModel model = new YardModel() { YardId = 0, YardName = "Central Yard" };

//            // Act
//            AjaxModel<NTModel> ajaxModel = await this.Controller.YardUpdate(model);

//            // Assert
//            YardEntity entity = this.QuarryDbContext.Yards.Last();
//            Assert.Equal(entity.YardName, "Central Yard");
//            Assert.Equal(ajaxModel.Message, QuarryMessages.YardSaveSuccess);
//        }

//        [Fact]
//        public async void YardUpdate()
//        {
//            // Arrange
//            this.QuarryDbContext.Yards.AddRange(
//                    new YardEntity() { YardId = 1, YardName = "Central Yard", CompanyId = 1, DeletedInd = false },
//                    new YardEntity() { YardId = 2, YardName = "NDB Central Yard", CompanyId = 1, DeletedInd = false });
//            await this.SaveChangesAsync(this.QuarryDbContext);

//            YardModel model = new YardModel() { YardId = 2, YardName = "Boulder" };

//            // Act
//            AjaxModel<NTModel> ajaxModel = await this.Controller.YardUpdate(model);

//            // Assert
//            YardEntity entity = this.QuarryDbContext.Yards.Where(e => e.YardId == 2).First();
//            Assert.Equal(entity.YardName, "Boulder");
//            Assert.Equal(ajaxModel.Message, QuarryMessages.YardSaveSuccess);
//        }

//        [Fact]
//        public async void YardDelete()
//        {
//            // Arrange
//            this.QuarryDbContext.Yards.AddRange(
//                    new YardEntity() { YardId = 1, YardName = "Central Yard", CompanyId = 1, DeletedInd = false },
//                    new YardEntity() { YardId = 2, YardName = "NDB Central Yard", CompanyId = 1, DeletedInd = false });
//            await this.SaveChangesAsync(this.QuarryDbContext);

//            // Act
//            AjaxModel<NTModel> ajaxModel = await this.Controller.YardDelete(2);

//            // Assert
//            YardEntity entity = this.QuarryDbContext.Yards.Where(e => e.YardId == 2).First();
//            Assert.Equal(entity.DeletedInd, true);
//            Assert.Equal(ajaxModel.Message, QuarryMessages.YardDeleteSuccess);
//        }
//    }
//}
