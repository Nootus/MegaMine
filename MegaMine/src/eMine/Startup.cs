using eMine.Lib.Domain;
using eMine.Lib.Entities.Account;
using eMine.Lib.Filters;
using eMine.Lib.Mapping;
using eMine.Lib.Middleware;
using eMine.Lib.Repositories;
using eMine.Lib.Repositories.Fleet;
using eMine.Lib.Shared;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;

namespace eMine
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; set; }

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
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .AddMvcOptions(options => {
                    options.Filters.Add(new NTAuthorizeFilter());
                })
                .AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    options.SerializerSettings.DateTimeZoneHandling = Newtonsoft.Json.DateTimeZoneHandling.Local;
                });


            services.AddEntityFramework()
                .AddSqlServer()
            .AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]);
            });

            // Add Identity services to the services container.
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();


            //Dependency Injection
            //Fleet
            services.AddTransient<FleetDomain>();
            services.AddTransient<VehicleRepository>();
            services.AddTransient<SparePartRepository>();

            //Quarry
            services.AddTransient<QuarryDomain>();
            services.AddTransient<QuarryRepository>();

            //Accout
            services.AddTransient<AccountDomain>();
            services.AddTransient<AccountRepository>();

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
            //if (env.IsEnvironment(Constants.DevEnvironment))
            //{
            //    app.UseErrorPage(ErrorPageOptions.ShowAll);
            //    app.UseDatabaseErrorPage(DatabaseErrorPageOptions.ShowAll);
            //}
            //else
            //{ 
            //    app.UseErrorHandler("/Error");
            //}

            //app.UseErrorPage();

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


            //storing the HttpContextAccessor
            HttpHelper.Configure(app.ApplicationServices.GetRequiredService<IHttpContextAccessor>());
            MappingConfiguration.Configure();
        }
    }
}
