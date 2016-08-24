﻿//-------------------------------------------------------------------------------------------------
// <copyright file="UserProfileEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  User information
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Security.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("UserProfile", Schema = "security")]
    public class UserProfileEntity : BaseEntity
    {
        [Key]
        public string UserProfileId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string EmailAddress { get; set; }
    }
}