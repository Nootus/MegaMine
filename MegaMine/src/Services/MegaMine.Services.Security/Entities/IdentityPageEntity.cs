﻿//-------------------------------------------------------------------------------------------------
// <copyright file="IdentityPageEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Contains all the pages in the application
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Security.Entities
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    [Table("IdentityPage", Schema = "security")]
    public class IdentityPageEntity
    {
        [Key]
        public int PageId { get; set; }

        public string Text { get; set; }

        public string Controller { get; set; }

        public string ActionMethod { get; set; }

        public bool DashboardInd { get; set; }

        public List<IdentityPageClaimEntity> Claims { get; set; }

        public IEnumerable<IdentityClaimEntity> PageClaims
        {
            get
            {
                return this.Claims.Select(s => s.Claim);
            }
        }
    }
}