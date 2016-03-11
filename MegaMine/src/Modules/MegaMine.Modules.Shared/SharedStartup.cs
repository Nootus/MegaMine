using AutoMapper;
using MegaMine.Core;
using MegaMine.Modules.Shared.Mapping;
using MegaMine.Modules.Shared.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace MegaMine.Modules.Shared
{
    public class SharedStartup : ModuleStartup<SharedDbContext>
    {
        public override void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.AddTransient<SharedRepository>();
        }

        public override void ConfigureMapping(IConfiguration config)
        {
            config.AddProfile<SharedMappingProfile>();
        }
    }
}
