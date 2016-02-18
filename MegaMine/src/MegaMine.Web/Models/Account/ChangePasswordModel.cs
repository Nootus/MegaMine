using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Models.Account
{
    public class ChangePasswordModel
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
