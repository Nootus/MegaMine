//-------------------------------------------------------------------------------------------------
// <copyright file="ClaimModelComparer.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Comparer class to compare Claims
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Security.Models
{
    using System.Collections.Generic;

    public class ClaimModelComparer : IEqualityComparer<ClaimModel>
    {
        public bool Equals(ClaimModel x, ClaimModel y)
        {
            return x.ClaimType == y.ClaimType && x.ClaimValue == y.ClaimValue;
        }

        public int GetHashCode(ClaimModel obj)
        {
            return new { obj.ClaimType, obj.ClaimValue }.GetHashCode();
        }
    }
}