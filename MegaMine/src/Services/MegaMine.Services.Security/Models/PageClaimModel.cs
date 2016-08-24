﻿//-------------------------------------------------------------------------------------------------
// <copyright file="PageClaimModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Possible claims for each page
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Security.Models
{
    public class PageClaimModel
    {
        public int Id { get; set; }

        public int PageId { get; set; }

        public int ClaimId { get; set; }

        public bool PrimaryClaimInd { get; set; }

        public ClaimModel Claim { get; set; }
    }
}