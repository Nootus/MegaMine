using eMine.Models;
using eMine.Models.Account;
using eMine.Models.Shared;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eMine.Lib.MiddleWare
{
    public class ProfileMiddleWare
    {
        RequestDelegate next;

        public ProfileMiddleWare(RequestDelegate next)
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
                    FirstName = claims.First(c => c.Type == NClaimTypes.FirstName).Value,
                    LastName = claims.First(c => c.Type == NClaimTypes.LastName).Value
                };

                context.Items["Profile"] = profile;
            }

            await next(context);
        }

    }
}

//http://stackoverflow.com/questions/21762077/asp-net-identity-and-claims

