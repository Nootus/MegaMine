using MegaMine.Modules.Security.Middleware;
using MegaMine.Modules.Security.Repositories;
using Microsoft.AspNet.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace MegaMine.Modules.Security.Middleware
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseProfileMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ProfileMiddleware>();
        }

        public static IServiceCollection CachePageClaimsRoles(this IServiceCollection services)
        {
            SecurityRepository repository = services.BuildServiceProvider().GetRequiredService<SecurityRepository>();
            PageService.CachePageClaimsRoles(repository);
            return services;
        }
    }
}
