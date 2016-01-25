using eMine.Lib.Domain;
using eMine.Lib.Entities.Account;
using eMine.Lib.Shared;
using eMine.Models.Account;
using eMine.Models.Shared;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Identity;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eMine.Lib.Middleware
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


