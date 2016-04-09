using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Services.Widget.Models
{
    public class WidgetModel
    {
        public int WidgetId { get; set; }
        public string Name { get; set; }
        public string Claim { get; set; }
        public int SizeX { get; set; }
        public int SizeY { get; set; }
        public ChartTypeModel Chart { get; set; }
    }
}
