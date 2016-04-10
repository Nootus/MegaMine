using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Services.Widget.Models
{
    public class PageWidgetModel
    {
        public int DashboardPageWidgetId { get; set; }
        public int WidgetId { get; set; }
        public WidgetOptionsModel WidgetOptions { get; set; }
    }
}
