using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Framework.Internal;
using eMine.Lib.Shared;
using System.Security.Claims;
using eMine.Lib.Middleware;
using eMine.Models.Shared;

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

            var pageClaim = PageService.PageClaims.Where(c => String.Compare(c.Controller, controller, true) == 0 && String.Compare(c.ActionMethod, action, true) == 0).Select(s=> new { s.Module, s.Claim }).FirstOrDefault();

            if(pageClaim == null)
            {
                context.Result = new HttpStatusCodeResult(403);
                return;
            }

            //if page claim is null then it is allow anonymous
            if(pageClaim.Claim == null)
            {
                return;
            }

            var userClaims = context.HttpContext.User.Claims;

            //checking the companyid passed in headers
            string companies = userClaims.Where(c => c.Type == NTClaimTypes.Companies).Select(c => c.Value).FirstOrDefault();
            string companyId = context.HttpContext.Request.Headers.Get(Constants.HeaderCompanyId);
            if (companies == null || companyId == null || !companies.Split(',').Contains(companyId))
            {
                context.Result = new HttpStatusCodeResult(403);
                return;
            }

            //getting current roles and then get all the child roles
            string[] roles = userClaims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToArray();
            roles = PageService.Roles.Where(r => roles.Contains(r.Key)).Select(r => r.Item).ToArray();

            //checking whether user is an admin
            if (!roles.Contains(pageClaim.Module + AccountSettings.AdminSuffix))
            {
                //checking for deny claim
                if (userClaims.Any(c => c.Type == pageClaim.Module + AccountSettings.DenySuffix && c.Value == pageClaim.Claim))
                {
                    context.Result = new HttpUnauthorizedResult();
                }
                //checking for current claim
                else if (!userClaims.Any(c => c.Type == pageClaim.Module && c.Value == pageClaim.Claim))
                {
                    context.Result = new HttpStatusCodeResult(403);
                }
            }
        }

    }
}
