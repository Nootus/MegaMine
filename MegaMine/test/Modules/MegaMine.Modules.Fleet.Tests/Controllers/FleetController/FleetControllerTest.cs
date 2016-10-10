//-------------------------------------------------------------------------------------------------
// <copyright file="FleetControllerTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Base class for FleetController which creates the controller
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Tests.Controllers.FleetController
{
    using AutoMapper;
    using Domain;
    using Mapping;
    using MegaMine.Modules.Fleet.Controllers;
    using MegaMine.Test;
    using Repositories;
    using Services.Widget.Domain;
    using Services.Widget.Mapping;
    using Services.Widget.Repositories;

    public class FleetControllerTest : BaseTest
    {
        public FleetControllerTest()
        {
            this.CreateAppContext();

            // Automapper initializers
            Mapper.AddProfile<FleetMappingProfile>();
            Mapper.AddProfile<WidgetMappingProfile>();

            // setting up the context and repositories
            this.FleetDbContext = this.CreateDbContext<FleetDbContext>();
            FleetRepository fleetRepository = new FleetRepository(this.FleetDbContext);
            FleetDomain fleetDomain = new FleetDomain(fleetRepository);
            FleetDashboardDomain dashboardDomain = new FleetDashboardDomain(fleetRepository);

            this.WidgetDbContext = this.CreateDbContext<WidgetDbContext>();
            WidgetRepository widgetRepository = new WidgetRepository(this.WidgetDbContext);
            WidgetDomain widgetDomain = new WidgetDomain(widgetRepository);

            this.Controller = new FleetController(fleetDomain, dashboardDomain, widgetDomain);
        }

        protected FleetDbContext FleetDbContext { get; set; }

        protected WidgetDbContext WidgetDbContext { get; set; }

        protected FleetController Controller { get; set; }
    }
}
