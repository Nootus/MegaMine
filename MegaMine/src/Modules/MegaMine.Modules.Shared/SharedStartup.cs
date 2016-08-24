//-------------------------------------------------------------------------------------------------
// <copyright file="SharedStartup.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Startup for the Shared Module
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Shared
{
    using AutoMapper;
    using MegaMine.Core;
    using MegaMine.Modules.Shared.Domain;
    using MegaMine.Modules.Shared.Mapping;
    using MegaMine.Modules.Shared.Repositories;
    using Microsoft.Extensions.DependencyInjection;

    public class SharedStartup : ModuleStartup<SharedDbContext>
    {
        public override void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.AddTransient<SharedDomain>();
            services.AddTransient<SharedRepository>();
        }

        public override void ConfigureMapping(IConfiguration config)
        {
            config.AddProfile<SharedMappingProfile>();
        }
    }
}
