//-------------------------------------------------------------------------------------------------
// <copyright file="ConfigurationEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity for Configuration
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("Configuration")]
    public class ConfigurationEntity : BaseEntity
    {
        [Key]
        public int ConfigurationId { get; set; }

        public string ConfigKey { get; set; }

        public string ConfigValue { get; set; }
    }
}
