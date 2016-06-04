using MegaMine.Core.Context;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace MegaMine.Core.Extensions
{
    public class ContextMiddleware
    {
        private RequestDelegate next;

        public ContextMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            NTContext.HttpContext = context;
            NTContext.Context = null;
            await next(context);
        }
    }
}
