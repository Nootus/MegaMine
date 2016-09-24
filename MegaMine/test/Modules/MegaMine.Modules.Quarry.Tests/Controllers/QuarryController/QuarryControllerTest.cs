//-------------------------------------------------------------------------------------------------
// <copyright file="QuarryControllerTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Base class for QuarryController which creates the controller
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Tests.Controllers.QuarryController
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoMapper;
    using Entities;
    using MegaMine.Modules.Quarry.Controllers;
    using MegaMine.Modules.Quarry.Domain;
    using MegaMine.Modules.Quarry.Mapping;
    using MegaMine.Modules.Quarry.Repositories;
    using MegaMine.Services.Widget.Domain;
    using MegaMine.Services.Widget.Repositories;
    using MegaMine.Test;
    using Models;
    using Moq;
    using Services.Widget.Mapping;
    using Xunit;

    public class QuarryControllerTest : BaseTest
    {
        public QuarryControllerTest()
        {
            this.CreateAppContext();

            // Automapper initializers
            Mapper.AddProfile<QuarryMappingProfile>();
            Mapper.AddProfile<WidgetMappingProfile>();

            // setting up the context and repositories
            this.QuarryDbContext = this.CreateDbContext<QuarryDbContext>();
            QuarryRepository quarryRepository = new QuarryRepository(this.QuarryDbContext);
            QuarryDomain quarryDomain = new QuarryDomain(quarryRepository);
            QuarryDashboardDomain dashboardDomain = new QuarryDashboardDomain(quarryRepository);

            this.WidgetDbContext = this.CreateDbContext<WidgetDbContext>();
            WidgetRepository widgetRepository = new WidgetRepository(this.WidgetDbContext);
            WidgetDomain widgetDomain = new WidgetDomain(widgetRepository);

            this.Controller = new QuarryController(quarryDomain, dashboardDomain, widgetDomain);
        }

        protected QuarryDbContext QuarryDbContext { get; set; }

        protected WidgetDbContext WidgetDbContext { get; set; }

        protected QuarryController Controller { get; set; }

        protected async Task StockGetArrange()
        {
            this.QuarryDbContext.StockGet.AddRange(
                new StockEntity() { MaterialId = 1, BlockNumber = "1111", QuarryId = 1, YardId = 1 },
                new StockEntity() { MaterialId = 2, BlockNumber = "2222", QuarryId = 1, YardId = 1 },
                new StockEntity() { MaterialId = 3, BlockNumber = "3333", QuarryId = 1, YardId = 1 },
                new StockEntity() { MaterialId = 4, BlockNumber = "4444", QuarryId = 1, YardId = 1 });

            await this.SaveChangesAsync(this.QuarryDbContext);

            var moqDb = Mock.Get(this.QuarryDbContext);
            moqDb.Setup(m => m.FromSql<StockEntity>(It.IsAny<string>(), It.IsAny<object[]>()))
                .Returns(this.QuarryDbContext.StockGet);
        }

        protected void StockGetAssert(List<StockModel> stock)
        {
            Assert.Equal(stock.Count, 4);
            Assert.Equal(stock.Single(m => m.MaterialId == 2).BlockNumber, "2222");
        }
    }
}

// To create test methods for
// GroupYardsGet
