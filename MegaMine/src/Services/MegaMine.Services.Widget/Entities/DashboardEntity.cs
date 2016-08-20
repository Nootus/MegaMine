//-------------------------------------------------------------------------------------------------
// <copyright file="DashboardEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Mapping table that contains the page for which a dashboard is related
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Widget.Entities
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Dashboard", Schema = "widget")]
    public class DashboardEntity
    {
        [Key]
        public int DashboardId { get; set; }

        public int PageId { get; set; }
    }
}
