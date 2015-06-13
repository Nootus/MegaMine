using eMine.Lib.Repositories.Administration;
using eMine.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Domain
{
    public class AdminDomain
    {
        public void ConfigurationSave(ConfigurationModel model)
        {
            new AdminRepository().ConfigurationSave(model);
        }

    }
}
