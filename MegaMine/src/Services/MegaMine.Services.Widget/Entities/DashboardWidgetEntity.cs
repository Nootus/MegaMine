//-------------------------------------------------------------------------------------------------
// <copyright file="DashboardWidgetEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Mapping table to store the widgets for each dashboard
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Widget.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("DashboardWidget", Schema = "widget")]
    public class DashboardWidgetEntity
    {
        [Key]
        public int DashboardWidgetId { get; set; }

        public int DashboardId { get; set; }

        public int WidgetId { get; set; }
    }
}
