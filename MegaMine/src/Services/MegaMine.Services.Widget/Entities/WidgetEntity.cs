//-------------------------------------------------------------------------------------------------
// <copyright file="WidgetEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Contains the details of each widget, such as size, poisition, chart type and data
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Widget.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Widget", Schema = "widget")]
    public class WidgetEntity
    {
        [Key]
        public int WidgetId { get; set; }

        public string Name { get; set; }

        public string Claim { get; set; }

        public int SizeX { get; set; }

        public int SizeY { get; set; }

        public string XAxisLabel { get; set; }

        public string YAxisLabel { get; set; }

        public int ChartTypeId { get; set; }

        [ForeignKey("ChartTypeId")]
        public ChartTypeEntity Chart { get; set; }
    }
}
