using MegaMine.Core.Common;
using MegaMine.Core.Context;
using MegaMine.Services.Security.Common;
using MegaMine.Services.Security.Entities;
using MegaMine.Services.Security.Identity;
using MegaMine.Services.Security.Middleware;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Identity;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MegaMine.Services.Security.Middleware
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
            else if (SiteSettings.IsEnvironment(SecurityConstants.DevEnvironment))
            {
                ApplicationUser user = await userManager.FindByNameAsync(SecuritySettings.NootusProfileUserName);
                await signInManager.SignInAsync(user, false);
            }

            await next(context);

        }

        public void SetNTContext(HttpContext context)
        {
            var claims = context.User.Claims;

            string companyId = context.Request.Headers[SecurityConstants.HeaderCompanyId];
            companyId = companyId ?? context.User.Claims.Where(c => c.Type == NTClaimTypes.CompanyId).Select(c => c.Value).FirstOrDefault();

            NTContextModel model = new NTContextModel()
            {
                UserId = claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value,
                UserName = context.User.Identity.Name,
                FirstName = claims.First(c => c.Type == NTClaimTypes.FirstName).Value,
                LastName = claims.First(c => c.Type == NTClaimTypes.LastName).Value,
                CompanyId = Convert.ToInt32(companyId ?? "0")
            };

            //setting the Group CompanyId
            model.GroupCompanyId = PageService.CompanyClaims[model.CompanyId]?.ParentCompanyId ?? model.CompanyId;

            NTContext.Context = model;
        }
    }
}


