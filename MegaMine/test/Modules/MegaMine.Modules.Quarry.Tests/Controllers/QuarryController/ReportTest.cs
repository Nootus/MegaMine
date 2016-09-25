//-------------------------------------------------------------------------------------------------
// <copyright file="ReportTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Tests for Reports section in Quarry Controller
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Tests.Controllers.QuarryController
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Core.Models.Web;
    using Entities;
    using Models;
    using Moq;
    using Xunit;

    public class ReportTest : QuarryControllerTest
    {
        [Fact]
        public async void QuarrySummaryDetails()
        {
            // Arrange
            this.QuarryDbContext.Yards.AddRange(
                    new YardEntity() { YardId = 1, YardName = "Central Yard", QuarryId = 1, CompanyId = 1, DeletedInd = false },
                    new YardEntity() { YardId = 2, YardName = "NDB Central Yard", QuarryId = 2, CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.QuarryDbContext);
            await this.StockGetArrange();

            QuarrySummarySearchModel search = new QuarrySummarySearchModel() { QuarryId = 1, StartDate = null, EndDate = null };

            // Act
            AjaxModel<List<StockModel>> ajaxModel = await this.Controller.QuarrySummaryDetails(search);

            // Assert
            this.StockGetAssert(ajaxModel.Model);
        }

        [Fact]
        public async void ProductSummary()
        {
            // Arrange
            this.QuarryDbContext.MaterialColours.AddRange(
                    new MaterialColourEntity() { MaterialColourId = 1, ColourName = "White", CompanyId = 1, DeletedInd = false },
                    new MaterialColourEntity() { MaterialColourId = 2, ColourName = "Smoky", CompanyId = 1, DeletedInd = false });

            this.QuarryDbContext.ProductTypes.AddRange(
                    new ProductTypeEntity() { ProductTypeId = 1, ProductTypeName = "Slab", CompanyId = 1, DeletedInd = false },
                    new ProductTypeEntity() { ProductTypeId = 2, ProductTypeName = "Tile", CompanyId = 1, DeletedInd = false });

            this.QuarryDbContext.Quarries.AddRange(
                    new QuarryEntity() { QuarryId = 1, QuarryName = "QM1", CompanyId = 1, DeletedInd = false },
                    new QuarryEntity() { QuarryId = 2, QuarryName = "QM2", CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.QuarryDbContext);

            await this.ProductSummaryArrange();

            // Act
            AjaxModel<ProductSummaryViewModel> ajaxModel = await this.Controller.ProductSummary();
            ProductSummaryViewModel viewModel = ajaxModel.Model;

            // Assert
            Assert.Equal(viewModel.Colours[1].Item, "White");
            Assert.Equal(viewModel.ProductTypes[1].Item, "Tile");
            Assert.Equal(viewModel.Quarries[1].Item, "QM2");
            this.ProductSummaryAssert(viewModel.Summary);
        }

        [Fact]
        public async void ProductSummarySearch()
        {
            // Arrange
            await this.ProductSummaryArrange();

            ProductSummarySearchModel model = new ProductSummarySearchModel() { QuarryIds = new int[] { 1, 2 }, ProductTypeIds = new int[] { 1, 2 }, MaterialColourIds = new int[] { 1, 2 } };

            // Act
            AjaxModel<List<ProductSummaryModel>> ajaxModel = await this.Controller.ProductSummarySearch(model);

            // Assert
            this.ProductSummaryAssert(ajaxModel.Model);
        }

        [Fact]
        public async void ProductSummaryDetails()
        {
            // Arrange
            this.QuarryDbContext.Yards.AddRange(
                    new YardEntity() { YardId = 1, YardName = "Central Yard", QuarryId = 1, CompanyId = 1, DeletedInd = false },
                    new YardEntity() { YardId = 2, YardName = "NDB Central Yard", QuarryId = 2, CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.QuarryDbContext);
            await this.StockGetArrange();

            ProductSummarySearchModel model = new ProductSummarySearchModel() { QuarryIds = new int[] { 1 }, ProductTypeIds = new int[] { 1 }, MaterialColourIds = new int[] { 1 } };

            // Act
            AjaxModel<List<StockModel>> ajaxModel = await this.Controller.ProductSummaryDetails(model);

            // Assert
            this.StockGetAssert(ajaxModel.Model);
        }

        private async Task ProductSummaryArrange()
        {
            this.QuarryDbContext.ProductSummary.AddRange(
                new ProductSummaryEntity() { Id = "1", ProductTypeId = 1, ProductTypeName = "Slab", QuarryId = 1, QuarryName = "Q1" },
                new ProductSummaryEntity() { Id = "2", ProductTypeId = 1, ProductTypeName = "Tile", QuarryId = 1, QuarryName = "Q1" },
                new ProductSummaryEntity() { Id = "3", ProductTypeId = 1, ProductTypeName = "Slab", QuarryId = 1, QuarryName = "Q1" },
                new ProductSummaryEntity() { Id = "4", ProductTypeId = 1, ProductTypeName = "Slab", QuarryId = 1, QuarryName = "Q1" });

            await this.SaveChangesAsync(this.QuarryDbContext);

            var moqDb = Mock.Get(this.QuarryDbContext);
            moqDb.Setup(m => m.FromSql<ProductSummaryEntity>(It.IsAny<string>(), It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.ProductSummary);
        }

        private void ProductSummaryAssert(List<ProductSummaryModel> summary)
        {
            Assert.Equal(summary.Count, 4);
            Assert.Equal(summary.Single(m => m.Id == "2").ProductTypeName, "Tile");
        }
    }
}
