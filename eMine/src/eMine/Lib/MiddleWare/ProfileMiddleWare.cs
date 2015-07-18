using eMine.Lib.Entities.Account;
using eMine.Lib.Shared;
using eMine.Models;
using eMine.Models.Account;
using eMine.Models.Shared;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Framework.DependencyInjection;
using eMine.Lib.Repositories;
using Newtonsoft.Json;
using eMine.Lib.Domain;

namespace eMine.Lib.Middleware
{
    public class ProfileMiddleware
    {
        private RequestDelegate next;

        public ProfileMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            if (context.User.Identity.IsAuthenticated)
            {
                var claims = context.User.Claims;

                ProfileModel profile = new ProfileModel()
                {
                    UserID = claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value,
                    UserName = context.User.Identity.Name,
                    FirstName = claims.First(c => c.Type == NTClaimTypes.FirstName).Value,
                    LastName = claims.First(c => c.Type == NTClaimTypes.LastName).Value
                };

                context.Items[Constants.ProfileString] = profile;
            }
            //automatically loggin in in the dev mode
            else if (SiteSettings.IsEnvironment(Constants.DevEnvironment))
            {
                SignInManager<ApplicationUser> signInManager = context.ApplicationServices.GetService<SignInManager<ApplicationUser>>();
                UserManager<ApplicationUser> userManager = context.ApplicationServices.GetService<UserManager<ApplicationUser>>();
                AccountDomain accountDomain = context.ApplicationServices.GetService<AccountDomain>();

                ProfileModel profile = await accountDomain.ProfileGet(AccountSettings.DefaultProfileUserName);

                try
                {
                    ApplicationUser user = await userManager.FindByIdAsync(profile.UserID);
                    await signInManager.SignInAsync(user, false);
                }
                catch
                {
                    //ignore exception
                }
                context.Items[Constants.ProfileString] = profile;

            }

            await next(context);

        }

    }
}


