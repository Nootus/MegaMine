using MegaMine.Services.Security.Middleware;
using MegaMine.Services.Security.Repositories;
using Microsoft.AspNet.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace MegaMine.Services.Security.Middleware
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
