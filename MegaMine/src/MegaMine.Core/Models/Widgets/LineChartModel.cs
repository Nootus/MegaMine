using System.Collections.Generic;

namespace MegaMine.Core.Models.Widgets
{
    public class MultiChartModel<Tx, Ty> : ChartModel<Tx, Ty>
    {
        public List<string> XAxisDataLabels { get; set; }
    }
}
