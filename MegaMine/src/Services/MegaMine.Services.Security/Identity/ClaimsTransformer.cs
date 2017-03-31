//-------------------------------------------------------------------------------------------------
// <copyright file="ClaimsTransformer.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  User messages in this project
// </description>
//-------------------------------------------------------------------------------------------------

namespace MegaMine.Services.Security.Identity
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using MegaMine.Core.Context;
    using MegaMine.Services.Security.Models;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Http;
    using Newtonsoft.Json;

    public class ClaimsTransformer : IClaimsTransformer
    {
        public Task<ClaimsPrincipal> TransformAsync(ClaimsTransformationContext context)
        {
            ClaimsPrincipal principal = context.Principal;
            ClaimsIdentity identity = (ClaimsIdentity)principal.Identity;
            string claimString = NTContext.HttpContext.Session.GetString("IdentityClaims");
            if (claimString != null)
            {
                List<ClaimModel> sessionClaims = JsonConvert.DeserializeObject<List<ClaimModel>>(claimString);
                identity.AddClaims(sessionClaims.Select(sc => new Claim(sc.ClaimType, sc.ClaimValue)));
            }

            return Task.FromResult(principal);
        }
    }
}
