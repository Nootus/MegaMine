using System.Collections.Generic;

namespace MegaMine.Services.Widget.Models
{
    public class DashboardModel
    {
        public List<WidgetModel> AllWidgets { get; set; }
        public List<PageWidgetModel> PageWidgets { get; set; }
    }
}
