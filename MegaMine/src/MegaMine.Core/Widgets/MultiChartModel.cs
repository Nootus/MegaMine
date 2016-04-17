using System.Collections.Generic;

namespace MegaMine.Core.Widgets
{
    public class MultiChartModel<Tx, Ty> : ChartModel<Tx, Ty>
    {
        public List<Tx> XAxisDataLabels { get; set; }
    }
}
