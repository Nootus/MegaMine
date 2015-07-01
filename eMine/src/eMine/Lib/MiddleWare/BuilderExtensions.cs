using Microsoft.AspNet.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.MiddleWare
{
    public static class BuilderExtensions
    {
        public static IApplicationBuilder UseProfileMiddleWare(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ProfileMiddleWare>();
        }
    }
}
