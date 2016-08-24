//-------------------------------------------------------------------------------------------------
// <copyright file="QuarryStartup.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Startup for Quarry module
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry
{
    using AutoMapper;
    using MegaMine.Core;
    using MegaMine.Modules.Quarry.Domain;
    using MegaMine.Modules.Quarry.Mapping;
    using MegaMine.Modules.Quarry.Repositories;
    using Microsoft.Extensions.DependencyInjection;

    public class QuarryStartup : ModuleStartup<QuarryDbContext>
    {
        public override void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.AddTransient<QuarryDomain>();
            services.AddTransient<QuarryRepository>();

            services.AddTransient<QuarryDashboardDomain>();
        }

        public override void ConfigureMapping(IConfiguration config)
        {
            config.AddProfile<QuarryMappingProfile>();
        }
    }
}
