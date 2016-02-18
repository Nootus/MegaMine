﻿using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Lib.Shared
{
    public static class HttpHelper
    {
        private static IHttpContextAccessor HttpContextAccessor;
        public static void Configure(IHttpContextAccessor httpContextAccessor)
        {
            HttpContextAccessor = httpContextAccessor;
        }

        public static HttpContext HttpContext
        {
            get
            {
                return HttpContextAccessor?.HttpContext;
            }
        }
    }
}
