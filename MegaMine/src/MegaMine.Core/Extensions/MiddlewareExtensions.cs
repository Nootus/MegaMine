using Microsoft.AspNetCore.Builder;

namespace MegaMine.Core.Extensions
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseContextMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ContextMiddleware>();
        }
    }
}
