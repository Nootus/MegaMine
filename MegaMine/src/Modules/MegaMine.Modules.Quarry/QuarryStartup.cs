using AutoMapper;
using MegaMine.Core;
using MegaMine.Modules.Quarry.Domain;
using MegaMine.Modules.Quarry.Mapping;
using MegaMine.Modules.Quarry.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace MegaMine.Modules.Quarry
{
    public class QuarryStartup : ModuleStartup<QuarryDbContext>
    {

        public override void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.AddTransient<QuarryDomain>();
            services.AddTransient<QuarryRepository>();

            services.AddTransient<WidgetDomain>();
        }

        public override void ConfigureMapping(IConfiguration config)
        {
            config.AddProfile<QuarryMappingProfile>();
        }
    }
}
