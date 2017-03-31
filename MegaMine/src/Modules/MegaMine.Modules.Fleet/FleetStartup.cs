//-------------------------------------------------------------------------------------------------
// <copyright file="FleetStartup.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Startup for Fleet module
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet
{
    using AutoMapper;
    using MegaMine.Core;
    using MegaMine.Modules.Fleet.Domain;
    using MegaMine.Modules.Fleet.Mapping;
    using MegaMine.Modules.Fleet.Repositories;
    using Microsoft.Extensions.DependencyInjection;

    public class FleetStartup : ModuleStartup<FleetDbContext>
    {
        public override void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.AddTransient<FleetDomain>();
            services.AddTransient<FleetRepository>();

            services.AddTransient<FleetDashboardDomain>();
        }
    }
}
