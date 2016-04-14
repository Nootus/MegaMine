using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Core.Models.Widgets
{
    public class MultiBarChartModel
    {
        public string XAxisLabel { get; set; }
        public string YAxisLabel { get; set; }
        public List<BarChartModel> Bars { get; set; }

    }
}
