using MegaMine.Core;
using MegaMine.Modules.Quarry.Domain;
using MegaMine.Modules.Quarry.Repositories;
using Microsoft.Data.Entity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MegaMine.Modules.Quarry.Mapping;

namespace MegaMine.Modules.Quarry
{
    public class QuarryStartup : ModuleStartup<QuarryDbContext>
    {

        public override void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.AddTransient<QuarryDomain>();
            services.AddTransient<QuarryRepository>();
        }

        public override void ConfigureMapping(IConfiguration config)
        {
            config.AddProfile<QuarryMappingProfile>();
        }
    }
}
