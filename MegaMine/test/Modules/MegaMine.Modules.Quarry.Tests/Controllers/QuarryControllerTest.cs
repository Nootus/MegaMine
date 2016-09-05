//-------------------------------------------------------------------------------------------------
// <copyright file="QuarryControllerTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Tests for the QuarryController
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Tests.Controllers
{
    using System.Collections.Generic;
    using MegaMine.Core.Models.Web;
    using MegaMine.Modules.Quarry.Controllers;
    using MegaMine.Modules.Quarry.Domain;
    using MegaMine.Modules.Quarry.Entities;
    using MegaMine.Modules.Quarry.Mapping;
    using MegaMine.Modules.Quarry.Models;
    using MegaMine.Modules.Quarry.Repositories;
    using MegaMine.Services.Widget.Domain;
    using MegaMine.Services.Widget.Repositories;
    using MegaMine.Test;
    using Xunit;

    public class QuarryControllerTest
    {
        private QuarryDbContext quarryDbContext;
        private WidgetDbContext widgetDbContext;
        private QuarryController controller;

        public QuarryControllerTest()
        {
            TestUtility.InitializeMappingProfile<QuarryMappingProfile>();
            TestUtility.CreateAppContext();
            this.quarryDbContext = TestUtility.CreateDbContext<QuarryDbContext>();
            QuarryRepository quarryRepository = new QuarryRepository(this.quarryDbContext);
            QuarryDomain quarryDomain = new QuarryDomain(quarryRepository);
            QuarryDashboardDomain dashboardDomain = new QuarryDashboardDomain(quarryRepository);

            this.widgetDbContext = TestUtility.CreateDbContext<WidgetDbContext>();
            WidgetRepository widgetRepository = new WidgetRepository(this.widgetDbContext);
            WidgetDomain widgetDomain = new WidgetDomain(widgetRepository);

            this.controller = new QuarryController(quarryDomain, dashboardDomain, widgetDomain);
        }

        [Fact]
        public async void MaterialColoursGetTest()
        {
            // Arrange
            this.quarryDbContext.MaterialColours.AddRange(
                    new MaterialColourEntity() { MaterialColourId = 1, ColourName = "Red", CompanyId = 1, DeletedInd = false },
                    new MaterialColourEntity() { MaterialColourId = 2, ColourName = "Blue", CompanyId = 1, DeletedInd = false });
            await this.quarryDbContext.SaveChangesAsync();

            // Act
            AjaxModel<List<MaterialColourModel>> ajaxModel = await this.controller.MaterialColoursGet();
            List<MaterialColourModel> colours = ajaxModel.Model;

            // Assert
            Assert.Equal(colours.Count, 2);
            Assert.Equal(colours[1].ColourName, "Red");
        }
    }
}
