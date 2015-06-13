using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using Microsoft.AspNet.Hosting;
using Microsoft.Framework.ConfigurationModel;
using eMine.Lib.Shared;

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

            services.AddMvc();

            services.AddEntityFramework()
                .AddSqlServer();
            //.AddDbContext<ApplicationDbContext>(options =>
            //{
            //    options.UseSqlServer(Configuration.Get("Data:DefaultConnection:ConnectionString"));
            //});

        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseStaticFiles();
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
        }
    }
}
