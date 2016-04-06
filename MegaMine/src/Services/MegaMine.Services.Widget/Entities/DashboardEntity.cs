using MegaMine.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Services.Widget.Entities
{
    [Table("Dashboard", Schema = "widget")]
    public class DashboardEntity
    {
        [Key]
        public int DashboardId { get; set; }
        public string PageId { get; set; }
    }
}
