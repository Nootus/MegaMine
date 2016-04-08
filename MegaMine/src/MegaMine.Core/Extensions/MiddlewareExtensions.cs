using Microsoft.AspNet.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Core.Extensions
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UsecontextMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ContextMiddleware>();
        }
    }
}
