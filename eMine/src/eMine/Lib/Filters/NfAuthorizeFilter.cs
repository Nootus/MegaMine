using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Framework.Internal;

namespace eMine.Lib.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class NfAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private string module, claim;

        public NfAuthorizeAttribute(string module, string claim)
        {
            this.module = module;
            this.claim = claim;
        }

        public void OnAuthorization(AuthorizationContext context)
        {
            var userClaims = context.HttpContext.User.Claims;

            var currentClaim = userClaims.FirstOrDefault(c => c.Type == module && c.Value == claim);

            if (currentClaim == null)
            {
                context.Result = new HttpUnauthorizedResult();
            }
        }

    }
}
