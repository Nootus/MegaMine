//-------------------------------------------------------------------------------------------------
// <copyright file="TextureTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Test methods related to Texture
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Tests.Controllers.QuarryController
{
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Core.Models.Web;
    using Entities;
    using Models;
    using Xunit;

    public class TextureTest : QuarryControllerTest
    {
        [Fact]
        public async void TexturesGet()
        {
            // Arrange
            this.QuarryDbContext.Textures.AddRange(
                    new TextureEntity() { TextureId = 1, TextureName = "Crystaline", CompanyId = 1, DeletedInd = false },
                    new TextureEntity() { TextureId = 2, TextureName = "Milky", CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.QuarryDbContext);

            // Act
            AjaxModel<List<TextureModel>> ajaxModel = await this.Controller.TexturesGet();
            List<TextureModel> textures = ajaxModel.Model;

            // Assert
            Assert.Equal(textures.Count, 2);
            Assert.Equal(textures[1].TextureName, "Milky");
        }

        [Fact]
        public async void TextureAdd()
        {
            // Arrange
            TextureModel model = new TextureModel() { TextureId = 0, TextureName = "Crystaline" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.TextureAdd(model);

            // Assert
            TextureEntity entity = this.QuarryDbContext.Textures.Last();
            Assert.Equal(entity.TextureName, "Crystaline");
            Assert.Equal(ajaxModel.Message, QuarryMessages.TextureSaveSuccess);
        }

        [Fact]
        public async void TextureUpdate()
        {
            // Arrange
            this.QuarryDbContext.Textures.AddRange(
                    new TextureEntity() { TextureId = 1, TextureName = "Crystaline", CompanyId = 1, DeletedInd = false },
                    new TextureEntity() { TextureId = 2, TextureName = "Milky", CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.QuarryDbContext);

            TextureModel model = new TextureModel() { TextureId = 2, TextureName = "Grey" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.TextureUpdate(model);

            // Assert
            TextureEntity entity = this.QuarryDbContext.Textures.Where(e => e.TextureId == 2).First();
            Assert.Equal(entity.TextureName, "Grey");
            Assert.Equal(ajaxModel.Message, QuarryMessages.TextureSaveSuccess);
        }

        [Fact]
        public async void TextureDelete()
        {
            // Arrange
            this.QuarryDbContext.Textures.AddRange(
                    new TextureEntity() { TextureId = 1, TextureName = "Crystaline", CompanyId = 1, DeletedInd = false },
                    new TextureEntity() { TextureId = 2, TextureName = "Milky", CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.QuarryDbContext);

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.TextureDelete(2);

            // Assert
            TextureEntity entity = this.QuarryDbContext.Textures.Where(e => e.TextureId == 2).First();
            Assert.Equal(entity.DeletedInd, true);
            Assert.Equal(ajaxModel.Message, QuarryMessages.TextureDeleteSuccess);
        }
    }
}
