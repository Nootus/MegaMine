//-------------------------------------------------------------------------------------------------
// <copyright file="SecurityStartup.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Startup class for the security module
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Security
{
    using AutoMapper;
    using MegaMine.Core;
    using MegaMine.Services.Security.Domain;
    using MegaMine.Services.Security.Entities;
    using MegaMine.Services.Security.Extensions;
    using MegaMine.Services.Security.Identity;
    using MegaMine.Services.Security.Mapping;
    using MegaMine.Services.Security.Repositories;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.Extensions.DependencyInjection;

    public class SecurityStartup : ModuleStartup<SecurityDbContext>
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            base.ConfigureServices(services);

            services.AddIdentity<ApplicationUser, ApplicationRole>()
            .AddEntityFrameworkStores<SecurityDbContext>()
            .AddDefaultTokenProviders();

            // caching page claims
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

        public override void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseClaimsTransformation(new ClaimsTransformationOptions
            {
                Transformer = new ClaimsTransformer()
            });

            app.UseIdentity();
        }
    }
}