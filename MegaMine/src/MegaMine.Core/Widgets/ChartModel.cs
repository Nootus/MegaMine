using System.Collections.Generic;

namespace MegaMine.Core.Widgets
{
    public class ChartModel<Tx, Ty>
    {
        public string XAxisLabel { get; set; }
        public string YAxisLabel { get; set; }
        public List<ChartDataModel<Tx, Ty>> Data { get; set; }
        public List<Tx> XAxisDataLabels { get; set; }
    }
}
