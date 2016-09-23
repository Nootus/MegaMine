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
    using AutoMapper;
    using MegaMine.Modules.Quarry.Controllers;
    using MegaMine.Modules.Quarry.Domain;
    using MegaMine.Modules.Quarry.Mapping;
    using MegaMine.Modules.Quarry.Repositories;
    using MegaMine.Services.Widget.Domain;
    using MegaMine.Services.Widget.Repositories;
    using MegaMine.Test;
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
    }
}

// To create test methods for
// GroupYardsGet
