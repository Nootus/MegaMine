using MegaMine.Modules.Quarry.Domain;
using MegaMine.Modules.Quarry.Repositories;
using Microsoft.Data.Entity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Quarry
{
    public static class Startup
    {
        public static void ConfigureServices(IServiceCollection services, IConfigurationRoot Configuration)
        {
            services.AddEntityFramework()
            .AddSqlServer()
            .AddDbContext<QuarryDbContext>(options =>
            {
                options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]);
            });

            //Quarry
            services.AddTransient<QuarryDomain>();
            services.AddTransient<QuarryRepository>();

        }
    }
}
