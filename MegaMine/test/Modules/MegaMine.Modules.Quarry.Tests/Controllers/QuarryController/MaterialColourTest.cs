//-------------------------------------------------------------------------------------------------
// <copyright file="MaterialColourTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Test methods related to MaterialColour
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Tests.Controllers.QuarryController
{
    using System.Collections.Generic;
    using System.Linq;
    using Core.Models.Dashboard;
    using Core.Models.Widget;
    using MegaMine.Core.Models;
    using MegaMine.Core.Models.Web;
    using MegaMine.Modules.Quarry.Common;
    using MegaMine.Modules.Quarry.Entities;
    using MegaMine.Modules.Quarry.Models;
    using Moq;
    using Services.Widget.Entities;
    using Xunit;

    public class MaterialColourTest : QuarryControllerTest
    {
        [Fact]
        public async void MaterialColourListItemsGet()
        {
            // Arrange
            this.QuarryDbContext.MaterialColours.AddRange(
                    new MaterialColourEntity() { MaterialColourId = 1, ColourName = "White", CompanyId = 1, DeletedInd = false },
                    new MaterialColourEntity() { MaterialColourId = 2, ColourName = "Smoky", CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.QuarryDbContext);

            // Act
            AjaxModel<List<ListItem<int, string>>> ajaxModel = await this.Controller.MaterialColourListItemsGet();
            List<ListItem<int, string>> colours = ajaxModel.Model;

            // Assert
            Assert.Equal(colours.Count, 2);
            Assert.Equal(colours[1].Item, "White");
        }

        [Fact]
        public async void MaterialColoursGet()
        {
            // Arrange
            this.QuarryDbContext.MaterialColours.AddRange(
                    new MaterialColourEntity() { MaterialColourId = 1, ColourName = "White", CompanyId = 1, DeletedInd = false },
                    new MaterialColourEntity() { MaterialColourId = 2, ColourName = "Smoky", CompanyId = 1, DeletedInd = false });

            // mock data for dashboard stored procedure
            this.QuarryDbContext.ChartEntities.AddRange(
            new ChartEntity<string, int>() { Id = "WidgetMaterialColourMaterialCounts-1", Key = "Key", X = "Smoky", Y = 100, KeyOrder = 0, XOrder = 0 },
            new ChartEntity<string, int>() { Id = "WidgetMaterialColourMaterialCounts-2", Key = "Key", X = "White", Y = 200, KeyOrder = 0, XOrder = 0 },
            new ChartEntity<string, int>() { Id = "WidgetMaterialColourQuarryMaterialCounts-1", Key = "QM1", X = "Smoky", Y = 100, KeyOrder = 0, XOrder = 0 },
            new ChartEntity<string, int>() { Id = "WidgetMaterialColourQuarryMaterialCounts-2", Key = "QM1", X = "White", Y = 200, KeyOrder = 0, XOrder = 0 },
            new ChartEntity<string, int>() { Id = "WidgetMaterialColourProductTypeMaterialCounts-1", Key = "Slab", X = "Smoky", Y = 100, KeyOrder = 0, XOrder = 0 },
            new ChartEntity<string, int>() { Id = "WidgetMaterialColourProductTypeMaterialCounts-2", Key = "Slab", X = "White", Y = 200, KeyOrder = 0, XOrder = 0 });

            // Dashboard data
            this.AppContext.DashboardPageId = 57;

            // widget context entities
            this.WidgetDbContext.Dashboards.Add(new DashboardEntity() { DashboardId = 3, PageId = 57 });
            this.WidgetDbContext.DashboardWidgets.AddRange(
                    new DashboardWidgetEntity() { DashboardWidgetId = 7, DashboardId = 3, WidgetId = 7 },
                    new DashboardWidgetEntity() { DashboardWidgetId = 8, DashboardId = 3, WidgetId = 8 },
                    new DashboardWidgetEntity() { DashboardWidgetId = 9, DashboardId = 3, WidgetId = 9 });
            this.WidgetDbContext.Widgets.AddRange(
                    new WidgetEntity() { WidgetId = 7, Name = "Blocks Per Colour", Claim = "Quarry:Claim", SizeX = 2, SizeY = 2, ChartTypeId = 5, XAxisLabel = "Colours", YAxisLabel = "Blocks" },
                    new WidgetEntity() { WidgetId = 8, Name = "Blocks Per Colour & Quarry", Claim = "Quarry:Claim", SizeX = 4, SizeY = 2, ChartTypeId = 7, XAxisLabel = "Colours", YAxisLabel = "Blocks" },
                    new WidgetEntity() { WidgetId = 9, Name = "Blocks Per Colour & Product Type", Claim = "Quarry:Claim", SizeX = 6, SizeY = 1, ChartTypeId = 3, XAxisLabel = "Colours", YAxisLabel = "Blocks" });
            this.WidgetDbContext.ChartTypes.AddRange(
                    new ChartTypeEntity() { ChartTypeId = 3, Type = "lineChart" },
                    new ChartTypeEntity() { ChartTypeId = 5, Type = "donutChart" },
                    new ChartTypeEntity() { ChartTypeId = 7, Type = "stackedBarChart" });
            this.WidgetDbContext.DashboardPageWidgets.AddRange(
                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 7, DashboardId = 3, WidgetId = 7, Columns = 0, Rows = 0, SizeX = 2, SizeY = 2, CompanyId = 1 },
                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 8, DashboardId = 3, WidgetId = 8, Columns = 2, Rows = 0, SizeX = 4, SizeY = 2, CompanyId = 1 },
                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 9, DashboardId = 3, WidgetId = 9, Columns = 0, Rows = 2, SizeX = 6, SizeY = 1, CompanyId = 1 });

            await this.SaveChangesAsync(this.QuarryDbContext, this.WidgetDbContext);

            // Mocking stored procedure
            var moqChartSp = Mock.Get(this.QuarryDbContext);
            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetMaterialColourMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetMaterialColourMaterialCounts")));
            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetMaterialColourQuarryMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetMaterialColourQuarryMaterialCounts")));
            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetMaterialColourProductTypeMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetMaterialColourProductTypeMaterialCounts")));

            // Act
            AjaxModel<List<MaterialColourModel>> ajaxModel = await this.Controller.MaterialColoursGet();
            List<MaterialColourModel> colours = ajaxModel.Model;
            DashboardModel dashboard = ajaxModel.Dashboard;

            // Assert
            Assert.Equal(colours.Count, 2);
            Assert.Equal(colours[1].ColourName, "White");

            Assert.Equal(dashboard.AllWidgets.Count, 3);
            Assert.Equal(dashboard.PageWidgets.Count, 3);
            Assert.Equal(dashboard.PageWidgets[1].WidgetId, 8);
            Assert.Equal(dashboard.AllWidgets[1].WidgetId, 8);
            Assert.Equal(dashboard.AllWidgets[1].Chart.Type, "stackedBarChart");
            Assert.Equal(((ChartModel<string, int>)dashboard.AllWidgets[1].Chart.Model).Data[0].Values[1].Y, 200);
        }

        [Fact]
        public async void MaterialColourAdd()
        {
            // Arrange
            MaterialColourModel model = new MaterialColourModel() { MaterialColourId = 0, ColourName = "Grey" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.MaterialColourAdd(model);

            // Assert
            MaterialColourEntity entity = this.QuarryDbContext.MaterialColours.Last();
            Assert.Equal(entity.ColourName, "Grey");
            Assert.Equal(ajaxModel.Message, QuarryMessages.MaterialColourSaveSuccess);
        }

        [Fact]
        public async void MaterialColourUpdate()
        {
            // Arrange
            this.QuarryDbContext.MaterialColours.AddRange(
                    new MaterialColourEntity() { MaterialColourId = 1, ColourName = "White", CompanyId = 1, DeletedInd = false },
                    new MaterialColourEntity() { MaterialColourId = 2, ColourName = "Smoky", CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.QuarryDbContext);

            MaterialColourModel model = new MaterialColourModel() { MaterialColourId = 2, ColourName = "Grey" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.MaterialColourUpdate(model);

            // Assert
            MaterialColourEntity entity = this.QuarryDbContext.MaterialColours.Where(e => e.MaterialColourId == 2).First();
            Assert.Equal(entity.ColourName, "Grey");
            Assert.Equal(ajaxModel.Message, QuarryMessages.MaterialColourSaveSuccess);
        }

        [Fact]
        public async void MaterialColourDelete()
        {
            // Arrange
            this.QuarryDbContext.MaterialColours.AddRange(
                    new MaterialColourEntity() { MaterialColourId = 1, ColourName = "White", CompanyId = 1, DeletedInd = false },
                    new MaterialColourEntity() { MaterialColourId = 2, ColourName = "Smoky", CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.QuarryDbContext);

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.MaterialColourDelete(2);

            // Assert
            MaterialColourEntity entity = this.QuarryDbContext.MaterialColours.Where(e => e.MaterialColourId == 2).First();
            Assert.Equal(entity.DeletedInd, true);
            Assert.Equal(ajaxModel.Message, QuarryMessages.MaterialColourDeleteSuccess);
        }
    }
}
