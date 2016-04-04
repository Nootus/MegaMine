using AutoMapper;
using MegaMine.Core;
using MegaMine.Modules.Security.Domain;
using MegaMine.Modules.Security.Entities;
using MegaMine.Modules.Security.Identity;
using MegaMine.Modules.Security.Mapping;
using MegaMine.Modules.Security.Middleware;
using MegaMine.Modules.Security.Repositories;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace MegaMine.Modules.Security
{
    public class SecurityStartup : ModuleStartup<SecurityDbContext>
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            base.ConfigureServices(services);

            services.AddIdentity<ApplicationUser, ApplicationRole>()
            .AddEntityFrameworkStores<SecurityDbContext>()
            .AddDefaultTokenProviders();

            //caching page claims
            services.CachePageClaimsRoles();
        }
        public override void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.AddTransient<AccountDomain>();
            services.AddTransient<SecurityRepository>();
            services.AddScoped<SignInManager<ApplicationUser>, ApplicationSignInManager>();
        }

        public override void ConfigureMapping(IConfiguration config)
        {
            config.AddProfile<SecurityMappingProfile>();
        }
    }
}
