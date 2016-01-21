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

        public async Task Invoke(HttpContext context, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, AccountDomain accountDomain)
        {
            if (context.User.Identity.IsAuthenticated)
            {
                var claims = context.User.Claims;

                string companyId = context.Request.Headers[Constants.HeaderCompanyId];
                companyId = companyId ?? context.User.Claims.Where(c => c.Type == NTClaimTypes.CompanyId).Select(c => c.Value).FirstOrDefault();

                ProfileModel profile = new ProfileModel()
                {
                    UserID = claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value,
                    UserName = context.User.Identity.Name,
                    FirstName = claims.First(c => c.Type == NTClaimTypes.FirstName).Value,
                    LastName = claims.First(c => c.Type == NTClaimTypes.LastName).Value,
                    CompanyId = Convert.ToInt32(companyId ?? "0")
                };

                context.Items[Constants.ProfileString] = profile;
            }
            //automatically loggin in in the dev mode
            else if (SiteSettings.IsEnvironment(Constants.DevEnvironment))
            {
                //SignInManager<ApplicationUser> signInManager = (SignInManager<ApplicationUser>) context.ApplicationServices.GetService(typeof(SignInManager<ApplicationUser>));
                //UserManager<ApplicationUser> userManager = (UserManager<ApplicationUser>) context.ApplicationServices.GetService(typeof(UserManager<ApplicationUser>));
                //AccountDomain accountDomain = (AccountDomain) context.ApplicationServices.GetService(typeof(AccountDomain));

                ProfileModel profile = await accountDomain.ProfileGet(AccountSettings.DefaultProfileUserName);

                try
                {
                    ApplicationUser user = await userManager.FindByIdAsync(profile.UserID);
                    await signInManager.SignInAsync(user, false);
                }
                catch(Exception exp)
                {
                    //ignore exception
                }
                context.Items[Constants.ProfileString] = profile;

            }

            await next(context);

        }

    }
}


