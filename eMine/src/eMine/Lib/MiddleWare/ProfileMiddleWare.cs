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

namespace eMine.Lib.MiddleWare
{
    public class ProfileMiddleWare
    {
        private RequestDelegate next;
        private IServiceProvider serviceProvider;

        public ProfileMiddleWare(RequestDelegate next, IServiceProvider serviceProvider)
        {
            this.next = next;
            this.serviceProvider = serviceProvider;
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

                context.Items["Profile"] = profile;
            }
            else if (SiteSettings.IsEnvironment("Development"))
            {
                SignInManager<ApplicationUser> signInManager = serviceProvider.GetService<SignInManager<ApplicationUser>>();
                UserManager<ApplicationUser> userManager = serviceProvider.GetService<UserManager<ApplicationUser>>();

                ProfileModel profile = AccountSettings.DefaultProfile;

                ApplicationUser user = await userManager.FindByNameAsync(profile.UserName);
                await signInManager.SignInAsync(user, false);
                profile.UserID = user.Id;
                context.Items["Profile"] = profile;
            }

            
            await next(context);
        }

    }
}


