//-------------------------------------------------------------------------------------------------
// <copyright file="Startup.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Web Startup module which initializes ASP.NET and all other Micro apps
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web
{
    using AutoMapper;
    using MegaMine.Core;
    using MegaMine.Core.Common;
    using MegaMine.Core.Extensions;
    using MegaMine.Core.Mapping;
    using MegaMine.Modules.Plant;
    using MegaMine.Modules.Quarry;
    using MegaMine.Modules.Shared;
    using MegaMine.Services.Security;
    using MegaMine.Services.Security.Extensions;
    using MegaMine.Services.Security.Filters;
    using MegaMine.Services.Widget;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Modules.Fleet;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    public class Startup
    {
        private IModuleStartup[] modules = { new QuarryStartup(), new FleetStartup(), new PlantStartup(), new SharedStartup(), new SecurityStartup(), new WidgetStartup() };

        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            /*
            //if (env.IsDevelopment())
            //{
            //    // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
            //    builder.AddUserSecrets();
            //}
            */

            builder.AddEnvironmentVariables();
            this.Configuration = builder.Build();

            // initializing all modules
            foreach (var module in this.modules)
            {
                module.Startup(this.Configuration);
            }

            // saving the site settgins
            SiteSettings.ConnectionString = this.Configuration.GetConnectionString("MegaMine");
            SiteSettings.EnvironmentName = env.EnvironmentName;
        }

        public IConfigurationRoot Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            // configuring services for all modules
            foreach (var module in this.modules)
            {
                module.ConfigureServices(services);
            }

            services.AddMvc()
                .AddMvcOptions(options =>
                {
                    options.Filters.Add(new NTAuthorizeFilter());
                })
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
                    options.SerializerSettings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
                });

            // Automapper configurations
            Mapper.Initialize(x =>
            {
                x.AddProfile<CoreMappingProfile>();
                foreach (var module in this.modules)
                {
                    module.ConfigureMapping(x);
                }
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseContextMiddleware();

            // Add the following to the request pipeline only in development environment.
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseIdentity();
            app.UseProfileMiddleware();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "webapi",
                    template: "api/{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "Index" });

                routes.MapRoute(
                    name: "error",
                    template: "Error",
                    defaults: new { controller = "Home", action = "Error" });

                //routes.MapRoute(
                //    name: "default",
                //    template: "{*url}",
                //    defaults: new { controller = "Home", action = "Index" });

                routes.MapRoute(
                   name: "default",
                   template: "{controller}/{action}",
                   defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
