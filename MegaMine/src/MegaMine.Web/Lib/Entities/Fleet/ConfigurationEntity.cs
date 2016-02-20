using MegaMine.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Web.Lib.Entities.Fleet
{
    [Table("Configuration")]
    public class ConfigurationEntity : BaseEntity
    {
        [Key]
        public int ConfigurationId { get; set; }
        public string ConfigKey { get; set; }
        public string ConfigValue { get; set; }
    }
}
