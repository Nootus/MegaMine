//-------------------------------------------------------------------------------------------------
// <copyright file="ClaimModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Storing the Claims
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Security.Models
{
    public class ClaimModel
    {
        public int Id { get; set; }

        public string ClaimType { get; set; }

        public string ClaimValue { get; set; }
    }
}