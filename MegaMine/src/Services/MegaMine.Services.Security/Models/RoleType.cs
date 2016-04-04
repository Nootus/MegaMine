using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Services.Security.Models
{
    public enum RoleType
    {
        SuperAdmin = 1,
        GroupAdmin = 2,
        CompanyAdmin = 3,
        ModuleAdmin = 4,
        UserDefined =  5
    }
}
