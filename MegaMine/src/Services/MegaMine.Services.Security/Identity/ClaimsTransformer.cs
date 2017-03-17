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
    using System;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authentication;

    public class ClaimsTransformer : IClaimsTransformer
    {
        public Task<ClaimsPrincipal> TransformAsync(ClaimsTransformationContext context)
        {
            ClaimsPrincipal principal = context.Principal;
            ClaimsIdentity identity = (ClaimsIdentity)principal.Identity;
            identity.AddClaim(new Claim("TestClaim", @"
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
                This will be a very long string
            "));
            return Task.FromResult(principal);
        }
    }
}
