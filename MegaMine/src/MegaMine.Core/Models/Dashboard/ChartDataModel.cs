using System.Collections.Generic;

namespace MegaMine.Core.Models.Dashboard
{
    public class ChartDataModel<Tx, Ty>
    {
        public string Key { get; set; }
        public int Order { get; set; }
        public List<ChartPointModel<Tx, Ty>> Values { get; set; }
    }
}
