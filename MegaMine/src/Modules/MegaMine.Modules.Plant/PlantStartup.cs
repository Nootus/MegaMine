//-------------------------------------------------------------------------------------------------
// <copyright file="PlantStartup.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Start up class for the plant module
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant
{
    using AutoMapper;
    using MegaMine.Core;
    using MegaMine.Modules.Plant.Domain;
    using MegaMine.Modules.Plant.Mapping;
    using MegaMine.Modules.Plant.Repositories;
    using Microsoft.Extensions.DependencyInjection;

    public class PlantStartup : ModuleStartup<PlantDbContext>
    {
        public override void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.AddTransient<PlantDomain>();
            services.AddTransient<PlantRepository>();
        }

        public override void ConfigureMapping(IMapperConfigurationExpression config)
        {
            config.AddProfile<PlantMappingProfile>();
        }
    }
}
