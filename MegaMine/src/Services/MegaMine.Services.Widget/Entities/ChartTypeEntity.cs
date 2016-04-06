using MegaMine.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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
