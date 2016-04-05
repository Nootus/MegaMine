using MegaMine.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Services.Widget.Entities
{
    [Table("Dashboard", Schema = "widget")]
    public class DashboardWidgetEntity : BaseEntity
    {
        [Key]
        public int DashboardWidgetId { get; set; }
        public int DashboardId { get; set; }
        public int WidgetId { get; set; }
        public int Columns { get; set; }
        public int Rows { get; set; }
        public int SizeX { get; set; }
        public int SizeY { get; set; }
    }
}
