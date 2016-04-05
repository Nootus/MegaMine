using MegaMine.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Services.Widget.Entities
{
    [Table("Widget", Schema = "widget")]
    public class WidgetEntity
    {
        [Key]
        public int WidgetId { get; set; }
        public string Name { get; set; }
        public string Module { get; set; }
        public string Claim{ get; set; }
        public int SizeX { get; set; }
        public int SizeY { get; set; }
        public int ChartTypeId { get; set; }
    }
}
