//-------------------------------------------------------------------------------------------------
// <copyright file="DashboardPageWidgetEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  The size and position attributes of a widget
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Widget.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("DashboardPageWidget", Schema = "widget")]
    public class DashboardPageWidgetEntity : BaseEntity
    {
        [Key]
        public int DashboardPageWidgetId { get; set; }

        public int DashboardId { get; set; }

        public int WidgetId { get; set; }

        public int Columns { get; set; }

        public int Rows { get; set; }

        public int SizeX { get; set; }

        public int SizeY { get; set; }
    }
}
