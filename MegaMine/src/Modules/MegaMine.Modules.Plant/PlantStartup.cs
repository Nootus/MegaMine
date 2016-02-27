using AutoMapper;
using MegaMine.Core;
using MegaMine.Modules.Plant.Domain;
using MegaMine.Modules.Plant.Mapping;
using MegaMine.Modules.Plant.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace MegaMine.Modules.Plant
{
    public class PlantStartup : ModuleStartup<PlantDbContext>
    {
        public override void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.AddTransient<PlantDomain>();
            services.AddTransient<PlantRepository>();
        }

        public override void ConfigureMapping(IConfiguration config)
        {
            config.AddProfile<PlantMappingProfile>();
        }
    }
}
