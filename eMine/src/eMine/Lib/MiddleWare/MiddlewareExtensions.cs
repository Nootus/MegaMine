using eMine.Lib.Repositories;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Middleware
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseProfileMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ProfileMiddleware>();
        }

        public static IServiceCollection CachePageClaims(this IServiceCollection services)
        {
            AccountRepository repository = services.BuildServiceProvider().GetRequiredService<AccountRepository>();
            PageService.CachePageClaims(repository);
            return services;
        }
    }
}
