using MegaMine.Web.Lib.Context;
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
                SetNTContext(context);
            }
            //automatically logging in in the dev mode
            else if (SiteSettings.IsEnvironment(Constants.DevEnvironment))
            {
                ApplicationUser user = await userManager.FindByNameAsync(AccountSettings.DefaultProfileUserName);
                await signInManager.SignInAsync(user, false);
            }

            await next(context);

        }

        public void SetNTContext(HttpContext context)
        {
            var claims = context.User.Claims;

            string companyId = context.Request.Headers[Constants.HeaderCompanyId];
            companyId = companyId ?? context.User.Claims.Where(c => c.Type == NTClaimTypes.CompanyId).Select(c => c.Value).FirstOrDefault();

            NTContextProfileModel model = new NTContextProfileModel()
            {
                UserId = claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value,
                UserName = context.User.Identity.Name,
                FirstName = claims.First(c => c.Type == NTClaimTypes.FirstName).Value,
                LastName = claims.First(c => c.Type == NTClaimTypes.LastName).Value,
                CompanyId = Convert.ToInt32(companyId ?? "0")
            };

            NTContext.SetProfile(model);
        }
    }
}


