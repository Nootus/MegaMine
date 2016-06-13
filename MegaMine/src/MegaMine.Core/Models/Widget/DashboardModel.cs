using System.Collections.Generic;

namespace MegaMine.Core.Models.Widget
{
    public class DashboardModel
    {
        public List<WidgetModel> AllWidgets { get; set; }
        public List<PageWidgetModel> PageWidgets { get; set; }
    }
}
