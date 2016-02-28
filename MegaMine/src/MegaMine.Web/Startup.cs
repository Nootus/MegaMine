using AutoMapper;
using MegaMine.Core;
using MegaMine.Modules.Plant;
using MegaMine.Modules.Quarry;
using MegaMine.Web.Lib.Domain;
using MegaMine.Web.Lib.Entities.Account;
using MegaMine.Web.Lib.Filters;
using MegaMine.Web.Lib.Mapping;
using MegaMine.Web.Lib.Middleware;
using MegaMine.Web.Lib.Repositories;
using MegaMine.Web.Lib.Repositories.Fleet;
using MegaMine.Web.Lib.Shared;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Identity;
using Microsoft.Data.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace MegaMine.Web
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; set; }

        private IModuleStartup[] modules = { new QuarryStartup(), new PlantStartup() };

        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            //if (env.IsDevelopment())
            //{
            //    // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
            //    builder.AddUserSecrets();
            //}

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();

            //initializing all modules
            foreach (var module in modules)
                module.Initialize(Configuration);
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddEntityFramework()
            .AddSqlServer()
            .AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]);
            });

            services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            services.AddScoped<SignInManager<ApplicationUser>, ApplicationSignInManager>();

            //configuring services for all modules
            foreach (var module in modules)
                module.ConfigureServices(services);


            services.AddMvc()
                .AddMvcOptions(options => {
                    options.Filters.Add(new NTAuthorizeFilter());
                })
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
                    options.SerializerSettings.DateFormatHandling = DateFormatHandling.IsoDateFormat;
                });


            //Dependency Injection
            foreach (var module in modules)
                module.ConfigureDependencyInjection(services);

            //Fleet
            services.AddTransient<FleetDomain>();
            services.AddTransient<VehicleRepository>();
            //services.AddTransient<SparePartRepository>();


            //Accout
            services.AddTransient<AccountDomain>();
            services.AddTransient<AccountRepository>();

            //Automapper configurations
            Mapper.Initialize(x =>
            {
                foreach (var module in modules)
                    module.ConfigureMapping(x);
                x.AddProfile<FleetMappingProfile>();
                x.AddProfile<AccountMappingProfile>();
            });

            //caching page claims
            services.CachePageClaimsRoles();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //saving the site settgins
            SiteSettings.ConnectionString = Configuration["Data:DefaultConnection:ConnectionString"];
            SiteSettings.WebPath = Configuration["DNX_APPBASE"];
            SiteSettings.EnvironmentName = env.EnvironmentName;

            // Add the following to the request pipeline only in development environment.
            app.UseDeveloperExceptionPage();
            app.UseDatabaseErrorPage();
            //if (env.IsEnvironment(Constants.DevEnvironment))
            //{
            //    app.UseErrorPage(ErrorPageOptions.ShowAll);
            //    app.UseDatabaseErrorPage(DatabaseErrorPageOptions.ShowAll);
            //}
            //else
            //{ 
            //    app.UseErrorHandler("/Error");
            //}

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

                routes.MapRoute(
                    name: "default",
                    template: "{*url}",
                    defaults: new { controller = "Home", action = "Index" });

                //routes.MapRoute(
                //    name: "default",
                //    template: "{controller}/{action}",
                //    defaults: new { controller = "Home", action = "Index" });

            });
        }
    }
}
