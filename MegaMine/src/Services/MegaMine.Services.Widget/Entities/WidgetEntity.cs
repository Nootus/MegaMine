using MegaMine.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Services.Widget.Entities
{
    [Table("Widget", Schema = "widget")]
    public class WidgetEntity: BaseEntity
    {
        [Key]
        public int WidgetId { get; set; }
        public string Name { get; set; }
    }
}
