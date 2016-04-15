using System.Collections.Generic;

namespace MegaMine.Core.Models.Widgets
{
    public class ChartDataModel<Tx, Ty>
    {
        public string Key { get; set; }
        public List<ChartPointModel<Tx, Ty>> Values { get; set; }
    }
}
