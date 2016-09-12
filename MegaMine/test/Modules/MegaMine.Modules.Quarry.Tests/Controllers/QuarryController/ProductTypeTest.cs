namespace MegaMine.Modules.Quarry.Tests.Controllers.QuarryController
{
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Core.Models.Web;
    using Entities;
    using Models;
    using Xunit;

    public class ProductTypeTest : QuarryControllerTest
    {
        [Fact]
        public async void ProductTypesGet()
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
        public async void ProductTypeAdd()
        {
            // Arrange
            ProductTypeModel model = new ProductTypeModel() { ProductTypeId = 0, ProductTypeName = "Tile" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.ProductTypeUpdate(model);

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
