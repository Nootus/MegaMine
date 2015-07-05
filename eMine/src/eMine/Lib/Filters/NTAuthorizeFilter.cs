using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Framework.Internal;
using eMine.Lib.Shared;
using System.Security.Claims;

namespace eMine.Lib.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class NTAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private string module, claim;

        public NTAuthorizeAttribute(string module, string claim)
        {
            this.module = module;
            this.claim = claim;
        }

        public void OnAuthorization(AuthorizationContext context)
        {
            var userClaims = context.HttpContext.User.Claims;

            //checking whether user is an admin
            if (!userClaims.Any(c => c.Type == ClaimTypes.Role && AccountSettings.SiteAdmin.Exists(r => r == c.Value)))
            {
                //check for module Ading
                if(!userClaims.Any(c => c.Type == ClaimTypes.Role && c.Value == module + AccountSettings.AdminSuffix))
                {
                    //checking for current claim
                    if (!userClaims.Any(c => c.Type == module && c.Value == claim))
                    {
                        context.Result = new HttpUnauthorizedResult();
                    }
                }
            }
        }

    }
}
