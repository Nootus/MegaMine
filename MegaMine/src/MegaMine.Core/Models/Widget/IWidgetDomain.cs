using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Core.Models.Widget
{
    public interface IWidgetDomain
    {
        Task<DashboardModel> DashboardGet(int pageId);
    }
}
