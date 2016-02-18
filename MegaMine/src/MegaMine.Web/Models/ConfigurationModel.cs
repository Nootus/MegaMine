using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Models
{
    public class ConfigurationModel
    {

        public int ConfigurationId { get; set; } // int  NOT NULL ,
        public string ConfigKey { get; set; } // nvarchar(128)  NULL ,
        public string ConfigValue { get; set; } //nvarchar(128)  NULL,
    }
}
