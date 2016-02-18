using MegaMine.Web.Lib.Repositories;
using Microsoft.AspNet.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Lib.Middleware
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseProfileMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ProfileMiddleware>();
        }

        public static IServiceCollection CachePageClaimsRoles(this IServiceCollection services)
        {
            AccountRepository repository = services.BuildServiceProvider().GetRequiredService<AccountRepository>();
            PageService.CachePageClaimsRoles(repository);
            return services;
        }
    }
}
