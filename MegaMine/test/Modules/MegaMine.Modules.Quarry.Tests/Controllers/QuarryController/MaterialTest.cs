//-------------------------------------------------------------------------------------------------
// <copyright file="MaterialTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Tests for Material section in Quarry Controller
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Tests.Controllers.QuarryController
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Common;
    using Core.Models.Web;
    using Entities;
    using Microsoft.EntityFrameworkCore.Infrastructure;
    using Models;
    using Moq;
    using Xunit;

    public class MaterialTest : QuarryControllerTest
    {
        [Fact]
        public async void MaterialViewModelGet()
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

            this.QuarryDbContext.Textures.AddRange(
                    new TextureEntity() { TextureId = 1, TextureName = "Crystaline", CompanyId = 1, DeletedInd = false },
                    new TextureEntity() { TextureId = 2, TextureName = "Milky", CompanyId = 1, DeletedInd = false });

            this.QuarryDbContext.ProcessTypes.AddRange(
                    new ProcessTypeEntity() { ProcessTypeId = 1, ProcessTypeName = "Cutting", CompanyId = 1, DeletedInd = false },
                    new ProcessTypeEntity() { ProcessTypeId = 2, ProcessTypeName = "Crushing", CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.QuarryDbContext);

            // Act
            AjaxModel<MaterialViewModel> ajaxModel = await this.Controller.MaterialViewModelGet();
            MaterialViewModel viewModel = ajaxModel.Model;

            // Assert
            Assert.Equal(viewModel.MaterialColours[1].Item, "White");
            Assert.Equal(viewModel.ProductTypes[1].ProductTypeName, "Tile");
            Assert.Equal(viewModel.Quarries[1].Item, "QM2");
            Assert.Equal(viewModel.Textures[1].Item, "Milky");
            Assert.Equal(viewModel.ProcessTypes[1].Item, "Cutting");
        }

        [Fact]
        public async void MaterialSave()
        {
            // Arrange
            this.QuarryDbContext.Yards.AddRange(
                    new YardEntity() { YardId = 1, YardName = "Central Yard", QuarryId = 1, CompanyId = 1, DeletedInd = false },
                    new YardEntity() { YardId = 2, YardName = "NDB Central Yard", QuarryId = 2, CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.QuarryDbContext);

            // input model
            List<MaterialModel> models = new List<MaterialModel>()
            {
                new MaterialModel() { MaterialId = 1, BlockNumber = "1111", QuarryId = 1, YardId = 1, MaterialColourId = 1, ProductTypeId = 1, ProcessTypeId = 1, Length = 0.5m, Width = 0.5m, Height = 0.5m, Weight = 0.5m, MaterialDate = DateTime.Now },
                new MaterialModel() { MaterialId = 2, BlockNumber = "2222", QuarryId = 1, YardId = 1, MaterialColourId = 1, ProductTypeId = 1, ProcessTypeId = 1, Length = 0.5m, Width = 0.5m, Height = 0.5m, Weight = 0.5m, MaterialDate = DateTime.Now }
            };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.MaterialSave(models);

            // Assert
            List<MaterialEntity> materials = this.QuarryDbContext.Materials.ToList();
            List<MaterialMovementEntity> movements = this.QuarryDbContext.MaterialMovements.ToList();

            Assert.Equal(ajaxModel.Message, QuarryMessages.MaterialSaveSuccess);
            Assert.Equal(materials.Count, 2);
            Assert.Equal(materials[1].BlockNumber, "2222");
            Assert.Equal(movements.Count, 2);
        }

        [Fact]
        public async void MaterialDelete()
        {
            // Arrange
            this.QuarryDbContext.Materials.AddRange(
                    new MaterialEntity() { MaterialId = 1, BlockNumber = "1111", QuarryId = 1, YardId = 1, MaterialColourId = 1, ProductTypeId = 1, ProcessTypeId = 1, Length = 0.5m, Width = 0.5m, Height = 0.5m, Weight = 0.5m, MaterialDate = DateTime.Now },
                    new MaterialEntity() { MaterialId = 2, BlockNumber = "2222", QuarryId = 1, YardId = 1, MaterialColourId = 1, ProductTypeId = 1, ProcessTypeId = 1, Length = 0.5m, Width = 0.5m, Height = 0.5m, Weight = 0.5m, MaterialDate = DateTime.Now });

            await this.SaveChangesAsync(this.QuarryDbContext);

            await this.StockGetArrange();

            // Act
            AjaxModel<List<StockModel>> ajaxModel = await this.Controller.MaterialDelete(2, 1);

            // Assert
            MaterialEntity material = this.QuarryDbContext.Materials.Where(m => m.MaterialId == 2).Single();

            Assert.Equal(ajaxModel.Message, QuarryMessages.MaterialDeleteSuccess);
            Assert.Equal(material.BlockNumber, "2222");
            Assert.Equal(material.DeletedInd, true);

            this.StockGetAssert(ajaxModel.Model);
        }

        [Fact]
        public async void StockGet()
        {
            // Arrange
            await this.StockGetArrange();

            // Act
            AjaxModel<List<StockModel>> ajaxModel = await this.Controller.StockGet(1);

            // Assert
            this.StockGetAssert(ajaxModel.Model);
        }

        [Fact]
        public async void MoveMaterial()
        {
            // Arrange
            await this.StockGetArrange();

            // mocking database calls
            var moqDb = Mock.Get(this.QuarryDbContext);
            var moqDatabase = new Mock<DatabaseFacade>(this.QuarryDbContext);
            moqDb.SetupGet(m => m.Database).Returns(moqDatabase.Object);
            moqDb.Setup(m => m.ExecuteSqlCommandAsync(It.IsAny<string>(), It.IsAny<object[]>()))
                .Returns(Task.FromResult(0));

            MaterialMovementModel model = new MaterialMovementModel() { FromYardId = 1, ToYardId = 1, MovementDate = DateTime.Now, MaterialIds = new int[] { 1, 2 } };

            // Act
            AjaxModel<List<StockModel>> ajaxModel = await this.Controller.MoveMaterial(model);

            // Assert
            Assert.Equal(ajaxModel.Message, QuarryMessages.MaterialMovementSuccess);
            this.StockGetAssert(ajaxModel.Model);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        public async void MaterialUpdate(int quarryId)
        {
            // Arrange
            this.QuarryDbContext.Yards.AddRange(
                    new YardEntity() { YardId = 1, YardName = "Central Yard", QuarryId = 1, CompanyId = 1, DeletedInd = false },
                    new YardEntity() { YardId = 2, YardName = "NDB Central Yard", QuarryId = 2, CompanyId = 1, DeletedInd = false });

            this.QuarryDbContext.Materials.Add(new MaterialEntity() { MaterialId = 1, BlockNumber = "1111", QuarryId = 1, YardId = 1, MaterialColourId = 1, ProductTypeId = 1, ProcessTypeId = 1, Length = 0.5m, Width = 0.5m, Height = 0.5m, Weight = 0.5m, MaterialDate = DateTime.Now });
            this.QuarryDbContext.MaterialMovements.Add(new MaterialMovementEntity() { MaterialId = 1, FromYardId = 1, ToYardId = 1 });

            await this.SaveChangesAsync(this.QuarryDbContext);

            await this.StockGetArrange();

            MaterialModel model = new MaterialModel() { MaterialId = 1, BlockNumber = "1112", QuarryId = quarryId, YardId = 1, MaterialColourId = 1, ProductTypeId = 1, ProcessTypeId = 1, Length = 0.5m, Width = 0.5m, Height = 0.5m, Weight = 0.5m, MaterialDate = DateTime.Now };

            // Act
            AjaxModel<List<StockModel>> ajaxModel = await this.Controller.MaterialUpdate(model, 1);

            // Assert
            MaterialEntity materialEntity = this.QuarryDbContext.Materials.Where(m => m.MaterialId == 1).Single();
            List<MaterialMovementEntity> movements = this.QuarryDbContext.MaterialMovements.ToList();

            Assert.Equal(ajaxModel.Message, QuarryMessages.MaterialUpdateSuccess);
            Assert.Equal(materialEntity.BlockNumber, "1112");

            this.StockGetAssert(ajaxModel.Model);
        }
    }
}
