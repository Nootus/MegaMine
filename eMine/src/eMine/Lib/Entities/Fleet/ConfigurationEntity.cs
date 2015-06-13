using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Fleet
{
    public class ConfigurationEntity : BaseEntity
    {
        public int ConfigurationId { get; set; }
        public string ConfigKey { get; set; }
        public string ConfigValue { get; set; }
    }
}
