using AutoMapper;
using MegaMine.Core;
using MegaMine.Services.Widget.Domain;
using MegaMine.Services.Widget.Mapping;
using MegaMine.Services.Widget.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace MegaMine.Services.Widget
{
    public class WidgetStartup : ModuleStartup<WidgetDbContext>
    {
        public override void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.AddTransient<WidgetDomain>();
            services.AddTransient<WidgetRepository>();
        }

        public override void ConfigureMapping(IConfiguration config)
        {
            config.AddProfile<WidgetMappingProfile>();
        }
    }
}
