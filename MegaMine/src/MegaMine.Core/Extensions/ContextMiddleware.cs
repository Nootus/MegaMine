using MegaMine.Core.Context;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using System;
using System.Collections.Generic;
using System.Linq;
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
            NTContext.SetContext(null);
            await next(context);
        }
    }
}
