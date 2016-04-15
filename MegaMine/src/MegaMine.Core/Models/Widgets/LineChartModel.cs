using System.Collections.Generic;

namespace MegaMine.Core.Models.Widgets
{
    public class LineChartModel<Tx, Ty> : ChartModel<Tx, Ty>
    {
        public List<string> XAxisDataLabels { get; set; }
    }
}
