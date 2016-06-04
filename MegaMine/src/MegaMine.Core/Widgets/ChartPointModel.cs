using System.Collections.Generic;

namespace MegaMine.Core.Widgets
{
    public class ChartPointModel<Tx, Ty> 
    {
        public Tx X { get; set; }
        public Ty Y { get; set; }
        public int Order { get; set; }
    }

    public class ChartPointModelComparer<Tx, Ty> : IEqualityComparer<ChartPointModel<Tx, Ty>>
    {
        public bool Equals(ChartPointModel<Tx, Ty> x, ChartPointModel<Tx, Ty> y)
        {
            return x.X.Equals(y.X);
        }

        public int GetHashCode(ChartPointModel<Tx, Ty> obj)
        {
            return obj.X.GetHashCode();
        }
    }
}
