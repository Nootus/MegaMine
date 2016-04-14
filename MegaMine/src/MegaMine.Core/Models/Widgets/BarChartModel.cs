using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Core.Models.Widgets
{
    public class BarChartModel
    {
        public string Key { get; set; }
        public List<ChartXYModel> Values { get; set; }
    }
}
