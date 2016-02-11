using Microsoft.AspNet.Mvc;
using System;
using System.Linq;
using eMine.Lib.Shared;
using System.Security.Claims;
using eMine.Lib.Middleware;
using eMine.Models.Shared;
using Microsoft.AspNet.Mvc.Filters;

namespace eMine.Lib.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class NTAuthorizeFilter : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationContext context)
        {
            //getting the current module and claim
            string action = context.RouteData.Values["action"].ToString().ToLower();
            string controller = context.RouteData.Values["controller"].ToString().ToLower() + "controller";

            var page = PageService.Pages.Where(c => String.Compare(c.Controller, controller, true) == 0 && String.Compare(c.ActionMethod, action, true) == 0).FirstOrDefault();

            if(page == null)
            {
                context.Result = new HttpStatusCodeResult(403);
                return;
            }

            //checking for annonymous claim
            if(page.PageClaims.Any(p => p.ClaimValue == AccountSettings.AnonymousClaim))
            {
                return;
            }

            var userClaims = context.HttpContext.User.Claims;

            //checking the companyid passed in headers
            string companies = userClaims.Where(c => c.Type == NTClaimTypes.Companies).Select(c => c.Value).FirstOrDefault();
            string companyId = context.HttpContext.Request.Headers[Constants.HeaderCompanyId];
            companyId = companyId ?? userClaims.Where(c => c.Type == NTClaimTypes.CompanyId).Select(c => c.Value).FirstOrDefault();

            if (companies == null || companyId == null || !companies.Split(',').Contains(companyId))
            {
                context.Result = new HttpStatusCodeResult(403);
                return;
            }

            //getting current roles and then get all the child roles
            string[] roles = userClaims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToArray();
            //roles = PageService.AdminRoles.Where(r => roles.Contains(r.Key)).Select(r => r.Item).ToArray();

            //checking whether user is an admin
            if (!roles.Any(r => page.PageClaims.Any(p => r == p.ClaimType + AccountSettings.AdminSuffix)))
            {
                //checking for deny claim
                if (userClaims.Any(c => page.PageClaims.Any(p => c.Type == p.ClaimType + AccountSettings.DenySuffix && c.Value == p.ClaimValue)))
                {
                    context.Result = new HttpStatusCodeResult(403);  //new HttpUnauthorizedResult();
                }
                //checking for current claim
                else if (!userClaims.Any(c => page.PageClaims.Any(p => c.Type == p.ClaimType  && c.Value == p.ClaimValue )))
                {
                    context.Result = new HttpStatusCodeResult(403);
                }
            }
        }

    }
}
