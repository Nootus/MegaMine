//-------------------------------------------------------------------------------------------------
// <copyright file="ProductTypeTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Tests for ProductType section in Quarry
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

    public class ProductTypeTest : QuarryControllerTest
    {
        [Fact]
        public async void ProductTypeListGet()
        {
            // Arrange
            this.QuarryDbContext.ProductTypes.AddRange(
                    new ProductTypeEntity() { ProductTypeId = 1, ProductTypeName = "Slab", CompanyId = 1, DeletedInd = false },
                    new ProductTypeEntity() { ProductTypeId = 2, ProductTypeName = "Tile", CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.QuarryDbContext);

            // Act
            AjaxModel<List<ProductTypeModel>> ajaxModel = await this.Controller.ProductTypeListGet();
            List<ProductTypeModel> productTypes = ajaxModel.Model;

            // Assert
            Assert.Equal(productTypes.Count, 2);
            Assert.Equal(productTypes[1].ProductTypeName, "Tile");
        }

        [Fact]
        public async void ProductTypesGet()
        {
            // Arrange
            // adding Product Types
            this.QuarryDbContext.ProductTypes.AddRange(
                    new ProductTypeEntity() { ProductTypeId = 1, ProductTypeName = "Slab", CompanyId = 1, DeletedInd = false },
                    new ProductTypeEntity() { ProductTypeId = 2, ProductTypeName = "Tile", CompanyId = 1, DeletedInd = false });

            // mock data for dashboard stored procedure
            this.QuarryDbContext.ChartEntities.AddRange(
            new ChartEntity<string, int>() { Id = "WidgetProductTypeMaterialCounts-1", Key = "Key", X = "Slab", Y = 100, KeyOrder = 0, XOrder = 1 },
            new ChartEntity<string, int>() { Id = "WidgetProductTypeMaterialCounts-2", Key = "Key", X = "Tile", Y = 200, KeyOrder = 0, XOrder = 2 },
            new ChartEntity<string, int>() { Id = "WidgetProductTypeQuarryMaterialCounts-1", Key = "QM1", X = "Slab", Y = 100, KeyOrder = 0, XOrder = 1 },
            new ChartEntity<string, int>() { Id = "WidgetProductTypeQuarryMaterialCounts-2", Key = "QM1", X = "Tile", Y = 200, KeyOrder = 0, XOrder = 2 },
            new ChartEntity<string, int>() { Id = "WidgetProductTypeMaterialColourMaterialCounts-1", Key = "Multi-Color", X = "Slab", Y = 100, KeyOrder = 0, XOrder = 1 },
            new ChartEntity<string, int>() { Id = "WidgetProductTypeMaterialColourMaterialCounts-2", Key = "Multi-Color", X = "Tile", Y = 200, KeyOrder = 0, XOrder = 2 });

            // Dashboard data
            this.AppContext.DashboardPageId = 56;

            // widget context entities
            this.WidgetDbContext.Dashboards.Add(new DashboardEntity() { DashboardId = 2, PageId = 56 });
            this.WidgetDbContext.DashboardWidgets.AddRange(
                    new DashboardWidgetEntity() { DashboardWidgetId = 4, DashboardId = 2, WidgetId = 4 },
                    new DashboardWidgetEntity() { DashboardWidgetId = 5, DashboardId = 2, WidgetId = 5 },
                    new DashboardWidgetEntity() { DashboardWidgetId = 6, DashboardId = 2, WidgetId = 6 });
            this.WidgetDbContext.Widgets.AddRange(
                    new WidgetEntity() { WidgetId = 4, Name = "Blocks Per Product Type", Claim = "Quarry:Claim", SizeX = 3, SizeY = 2, ChartTypeId = 1, XAxisLabel = "Product Types", YAxisLabel = "Blocks" },
                    new WidgetEntity() { WidgetId = 5, Name = "Blocks Per Product Types & Quarry", Claim = "Quarry:Claim", SizeX = 3, SizeY = 2, ChartTypeId = 4, XAxisLabel = "Product Types", YAxisLabel = "Blocks" },
                    new WidgetEntity() { WidgetId = 6, Name = "Blocks Per Product Type & Colour", Claim = "Quarry:Claim", SizeX = 6, SizeY = 1, ChartTypeId = 6, XAxisLabel = "Product Types", YAxisLabel = "Blocks" });
            this.WidgetDbContext.ChartTypes.AddRange(
                    new ChartTypeEntity() { ChartTypeId = 1, Type = "discreteBarChart" },
                    new ChartTypeEntity() { ChartTypeId = 4, Type = "multiBarChart" },
                    new ChartTypeEntity() { ChartTypeId = 6, Type = "stackedAreaChart" });
            this.WidgetDbContext.DashboardPageWidgets.AddRange(
                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 4, DashboardId = 2, WidgetId = 4, Columns = 0, Rows = 0, SizeX = 3, SizeY = 2, CompanyId = 1 },
                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 5, DashboardId = 2, WidgetId = 5, Columns = 3, Rows = 0, SizeX = 3, SizeY = 2, CompanyId = 1 },
                    new DashboardPageWidgetEntity() { DashboardPageWidgetId = 6, DashboardId = 2, WidgetId = 6, Columns = 0, Rows = 2, SizeX = 6, SizeY = 1, CompanyId = 1 });

            await this.SaveChangesAsync(this.QuarryDbContext, this.WidgetDbContext);

            // Mocking stored procedure
            var moqChartSp = Mock.Get(this.QuarryDbContext);
            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetProductTypeMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetProductTypeMaterialCounts")));
            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetProductTypeQuarryMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetProductTypeQuarryMaterialCounts")));
            moqChartSp.Setup(m => m.FromSql<ChartEntity<string, int>>("quarry.WidgetProductTypeMaterialColourMaterialCounts @CompanyId = {0}", It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ChartEntities.Where(w => w.Id.Contains("WidgetProductTypeMaterialColourMaterialCounts")));

            // Act
            AjaxModel<List<ProductTypeModel>> ajaxModel = await this.Controller.ProductTypesGet();
            List<ProductTypeModel> productTypes = ajaxModel.Model;
            DashboardModel dashboard = ajaxModel.Dashboard;

            // Assert
            Assert.Equal(productTypes.Count, 2);
            Assert.Equal(productTypes[1].ProductTypeName, "Tile");

            Assert.Equal(dashboard.AllWidgets.Count, 3);
            Assert.Equal(dashboard.PageWidgets.Count, 3);
            Assert.Equal(dashboard.PageWidgets[1].WidgetId, 5);
            Assert.Equal(dashboard.AllWidgets[1].WidgetId, 5);
            Assert.Equal(dashboard.AllWidgets[1].Chart.Type, "multiBarChart");
            Assert.Equal(((ChartModel<string, int>)dashboard.AllWidgets[1].Chart.Model).Data[0].Values[1].Y, 200);
        }

        [Fact]
        public async void ProductTypeAdd()
        {
            // Arrange
            ProductTypeModel model = new ProductTypeModel() { ProductTypeId = 0, ProductTypeName = "Tile" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.ProductTypeAdd(model);

            // Assert
            ProductTypeEntity entity = this.QuarryDbContext.ProductTypes.Last();
            Assert.Equal(entity.ProductTypeName, "Tile");
            Assert.Equal(ajaxModel.Message, QuarryMessages.ProductTypeSaveSuccess);
        }

        [Fact]
        public async void ProductTypeUpdate()
        {
            // Arrange
            this.QuarryDbContext.ProductTypes.AddRange(
                    new ProductTypeEntity() { ProductTypeId = 1, ProductTypeName = "Slab", CompanyId = 1, DeletedInd = false },
                    new ProductTypeEntity() { ProductTypeId = 2, ProductTypeName = "Tile", CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.QuarryDbContext);

            ProductTypeModel model = new ProductTypeModel() { ProductTypeId = 2, ProductTypeName = "Boulder" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.ProductTypeUpdate(model);

            // Assert
            ProductTypeEntity entity = this.QuarryDbContext.ProductTypes.Where(e => e.ProductTypeId == 2).First();
            Assert.Equal(entity.ProductTypeName, "Boulder");
            Assert.Equal(ajaxModel.Message, QuarryMessages.ProductTypeSaveSuccess);
        }

        [Fact]
        public async void ProductTypeDelete()
        {
            // Arrange
            this.QuarryDbContext.ProductTypes.AddRange(
                    new ProductTypeEntity() { ProductTypeId = 1, ProductTypeName = "Slab", CompanyId = 1, DeletedInd = false },
                    new ProductTypeEntity() { ProductTypeId = 2, ProductTypeName = "Tile", CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.QuarryDbContext);

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.ProductTypeDelete(2);

            // Assert
            ProductTypeEntity entity = this.QuarryDbContext.ProductTypes.Where(e => e.ProductTypeId == 2).First();
            Assert.Equal(entity.DeletedInd, true);
            Assert.Equal(ajaxModel.Message, QuarryMessages.ProductTypeDeleteSuccess);
        }
    }
}
