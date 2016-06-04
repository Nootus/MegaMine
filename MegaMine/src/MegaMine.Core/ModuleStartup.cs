using MegaMine.Core.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MegaMine.Core
{
    public abstract class ModuleStartup<TContext> : IModuleStartup where TContext: DbContext
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

            ConfigureDependencyInjection(services);
        }

        public abstract void ConfigureDependencyInjection(IServiceCollection services);

        public abstract void ConfigureMapping(AutoMapper.IConfiguration action);
    }
}
