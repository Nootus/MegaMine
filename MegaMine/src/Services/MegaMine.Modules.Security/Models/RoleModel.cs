using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Security.Models
{
    public class RoleModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int CompanyId { get; set; }
        public int RoleType { get; set; }
    }
}
