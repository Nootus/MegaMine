using MegaMine.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Services.Widget.Entities
{
    [Table("DashboardPageWidget", Schema = "widget")]
    public class DashboardPageWidgetEntity : BaseEntity
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
