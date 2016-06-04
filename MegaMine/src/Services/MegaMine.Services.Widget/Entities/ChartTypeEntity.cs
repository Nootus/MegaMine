using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Services.Widget.Entities
{
    [Table("ChartType", Schema = "widget")]
    public class ChartTypeEntity
    {
        [Key]
        public int ChartTypeId { get; set; }
        public string Type { get; set; }
    }
}
