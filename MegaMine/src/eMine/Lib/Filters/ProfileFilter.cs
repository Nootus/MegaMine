using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Framework.Internal;
using Microsoft.AspNet.Identity;
using eMine.Lib.Entities.Account;
using eMine.Lib.Shared;
using eMine.Models.Account;

namespace eMine.Lib.Filters
{
    public class ProfileFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            await next();
        }
    }
}
