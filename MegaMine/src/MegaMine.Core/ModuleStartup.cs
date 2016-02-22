using Microsoft.Data.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace MegaMine.Core
{
    public abstract class ModuleStartup<TContext> : IModuleStartup where TContext: DbContext
    {
        protected IConfigurationRoot Configuration { get; set; }

        public virtual void Initialize(IConfigurationRoot configuration)
        {
            this.Configuration = configuration;
        }

        public virtual void ConfigureServices(IServiceCollection services)
        {
            services.AddEntityFramework()
            .AddSqlServer()
            .AddDbContext<TContext>(options =>
            {
                options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]);
            });
        }

        public abstract void ConfigureDependencyInjection(IServiceCollection services);

        public abstract void ConfigureMapping(AutoMapper.IConfiguration action);
    }
}
