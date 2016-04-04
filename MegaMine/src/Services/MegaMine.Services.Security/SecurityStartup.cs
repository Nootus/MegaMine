using AutoMapper;
using MegaMine.Core;
using MegaMine.Services.Security.Domain;
using MegaMine.Services.Security.Entities;
using MegaMine.Services.Security.Identity;
using MegaMine.Services.Security.Mapping;
using MegaMine.Services.Security.Middleware;
using MegaMine.Services.Security.Repositories;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace MegaMine.Services.Security
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
