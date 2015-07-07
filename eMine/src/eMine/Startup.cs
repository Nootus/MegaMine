using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.Hosting;
using Microsoft.Framework.ConfigurationModel;
using eMine.Lib.Shared;
using eMine.Lib.Entities.Account;
using eMine.Lib.Repositories;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Data.Entity;
using eMine.Lib.Domain;
using eMine.Lib.Repositories.Fleet;
using Microsoft.AspNet.Mvc;
using eMine.Lib.Filters;
using eMine.Lib.MiddleWare;
using Microsoft.AspNet.Diagnostics;
using Microsoft.AspNet.Diagnostics.Entity;

namespace eMine
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            //creating the config object
            Configuration = new Configuration()
                        .AddJsonFile("Config.json")
                        .AddEnvironmentVariables()
                        .AddJsonFile($"config.{env.EnvironmentName}.json", optional: true);
        }

        public IConfiguration Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<ProfileFilter>();

            services.AddMvc()
                .Configure<MvcOptions>(options =>
                {
                    //options.Filters.Add(new ProfileFilter());
                });

            services.AddEntityFramework()
                .AddSqlServer()
            .AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(Configuration.Get("Data:DefaultConnection:ConnectionString"));
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

            //Accout
            services.AddTransient<AccountDomain>();
            services.AddTransient<AccountRepository>();

        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            //saving the site settgins
            SiteSettings.ConnectionString = Configuration.Get("Data:DefaultConnection:ConnectionString");
            SiteSettings.WebPath = Configuration.Get("DNX_APPBASE");
            SiteSettings.EnvironmentName = env.EnvironmentName;

            // Add the following to the request pipeline only in development environment.
            //if (env.IsEnvironment("Development"))
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
            app.UseProfileMiddleWare();
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
        }
    }
}
