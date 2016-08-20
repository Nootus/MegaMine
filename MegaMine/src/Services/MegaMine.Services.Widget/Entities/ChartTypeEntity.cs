//-------------------------------------------------------------------------------------------------
// <copyright file="ChartTypeEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Contains different types of charts like Bar, Pie
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Widget.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("ChartType", Schema = "widget")]
    public class ChartTypeEntity
    {
        [Key]
        public int ChartTypeId { get; set; }

        public string Type { get; set; }
    }
}
