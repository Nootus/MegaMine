using MegaMine.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Services.Widget.Entities
{
    [Table("DashboardWidget", Schema = "widget")]
    public class DashboardWidgetEntity
    {
        [Key]
        public int DashboardWidgetId { get; set; }
        public int DashboardId { get; set; }
        public int WidgetId { get; set; }
    }
}
