﻿//-------------------------------------------------------------------------------------------------
// <copyright file="CompanyEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Contains the company details along with it's claims
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Security.Entities
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("Company", Schema = "security")]
    public class CompanyEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public new int CompanyId
        {
            get
            {
                return base.CompanyId;
            }

            set
            {
                base.CompanyId = value;
            }
        }

        public string CompanyName { get; set; }

        public bool GroupInd { get; set; }

        public int? ParentCompanyId { get; set; }

        public List<IdentityCompanyClaimEntity> Claims { get; set; }
    }
}