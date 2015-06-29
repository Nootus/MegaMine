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

namespace eMine
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            //creating the config object
            Configuration = new Configuration()
                        .AddJsonFile("Config.json")
                        .AddEnvironmentVariables();
        }

        public Microsoft.Framework.ConfigurationModel.IConfiguration Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            //saving the site settgins
            SiteSettings.ConnectionString = Configuration.Get("Data:DefaultConnection:ConnectionString");
            SiteSettings.WebPath = Configuration.Get("DNX_APPBASE");

            services.AddMvc()
                .Configure<MvcOptions>(options =>
                {
                    options.Filters.Add(new ProfileFilter());
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
            services.AddTransient<FleetDomain>();
            services.AddTransient<AccountDomain>();
            services.AddTransient<VehicleRepository>();
            services.AddTransient<SparePartRepository>();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseStaticFiles();
            app.UseIdentity();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "webapi",
                    template: "api/{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "Index" });

                routes.MapRoute(
                    name: "default",
                    template: "{*url}",
                    defaults: new { controller = "Home", action = "Index" });

            });

            //storing the HttpContextAccessor
            HttpHelper.Configure(app.ApplicationServices.GetRequiredService<IHttpContextAccessor>());
        }
    }
}
