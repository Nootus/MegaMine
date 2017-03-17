//-------------------------------------------------------------------------------------------------
// <copyright file="ModuleStartup.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  This is base startup class. This initializes the database connection and provide abstract methods
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Core
{
    using MegaMine.Core.Common;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    public abstract class ModuleStartup<TContext> : IModuleStartup
        where TContext : DbContext
    {
        protected IConfigurationRoot Configuration { get; set; }

        public virtual void Startup(IConfigurationRoot configuration)
        {
            this.Configuration = configuration;
        }

        public virtual void ConfigureServices(IServiceCollection services)
        {
            services.AddEntityFrameworkSqlServer()
            .AddDbContext<TContext>(options =>
            {
                options.UseSqlServer(SiteSettings.ConnectionString);
            });

            this.ConfigureDependencyInjection(services);
        }

        public abstract void ConfigureDependencyInjection(IServiceCollection services);

        public abstract void ConfigureMapping(AutoMapper.IConfiguration action);

        public virtual void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // this is not required for all Modules. Those needed will override
        }
    }
}
