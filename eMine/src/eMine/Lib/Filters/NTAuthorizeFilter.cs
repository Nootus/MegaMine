using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Framework.Internal;
using eMine.Lib.Shared;
using System.Security.Claims;
using eMine.Lib.Middleware;

namespace eMine.Lib.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class NTAuthorizeAttribute : Attribute, IAuthorizationFilter
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

            //checking whether user is an admin
            if (!userClaims.Any(c => c.Type == ClaimTypes.Role && (c.Value == pageClaim.Module + AccountSettings.AdminSuffix || AccountSettings.SiteAdmin.Exists(r => r == c.Value))))
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
