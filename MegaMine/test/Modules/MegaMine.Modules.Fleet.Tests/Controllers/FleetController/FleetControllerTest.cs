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

    public class FleetControllerTest : BaseTest
    {
        public FleetControllerTest()
        {
            this.CreateAppContext();

            // Automapper initializers
            Mapper.AddProfile<FleetMappingProfile>();

            // setting up the context and repositories
            this.FleetDbContext = this.CreateDbContext<FleetDbContext>();
            FleetRepository fleetRepository = new FleetRepository(this.FleetDbContext);
            FleetDomain fleetDomain = new FleetDomain(fleetRepository);

            this.Controller = new FleetController(fleetDomain);
        }

        protected FleetDbContext FleetDbContext { get; set; }

        protected FleetController Controller { get; set; }
    }
}
