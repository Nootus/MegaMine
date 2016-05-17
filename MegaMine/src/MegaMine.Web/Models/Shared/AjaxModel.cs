using MegaMine.Services.Widget.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Models.Shared
{
    public class AjaxModel<T>
    {
        public AjaxResult Result { get; set; }
        public string Message { get; set; }
        public T Model { get; set; }
        public DashboardModel Dashboard { get; set; }
    }
}
