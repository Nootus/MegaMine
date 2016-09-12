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
    using MegaMine.Core.Models;
    using MegaMine.Core.Models.Web;
    using MegaMine.Modules.Quarry.Common;
    using MegaMine.Modules.Quarry.Entities;
    using MegaMine.Modules.Quarry.Models;
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
            await this.SaveChangesAsync(this.QuarryDbContext);

            // Act
            AjaxModel<List<MaterialColourModel>> ajaxModel = await this.Controller.MaterialColoursGet();
            List<MaterialColourModel> colours = ajaxModel.Model;

            // Assert
            Assert.Equal(colours.Count, 2);
            Assert.Equal(colours[1].ColourName, "White");
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
