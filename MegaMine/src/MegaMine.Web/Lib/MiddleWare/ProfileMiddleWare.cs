using MegaMine.Web.Lib.Domain;
using MegaMine.Web.Lib.Entities.Account;
using MegaMine.Web.Lib.Shared;
using MegaMine.Web.Models.Account;
using MegaMine.Web.Models.Shared;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Identity;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MegaMine.Web.Lib.Middleware
{
    public class ProfileMiddleware
    {
        private RequestDelegate next;

        public ProfileMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            if (context.User.Identity.IsAuthenticated)
            {
                Profile.Set(context);
            }
            //automatically logging in in the dev mode
            else if (SiteSettings.IsEnvironment(Constants.DevEnvironment))
            {
                ApplicationUser user = await userManager.FindByNameAsync(AccountSettings.DefaultProfileUserName);
                await signInManager.SignInAsync(user, false);
            }

            await next(context);

        }

    }
}


