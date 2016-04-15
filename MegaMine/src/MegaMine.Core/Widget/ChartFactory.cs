using MegaMine.Core.Models.Widgets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Core.Widget
{
    public static class ChartFactory
    {
        public static ChartModel<Tx, Ty> CreateChartModel<Tx, Ty>(List<ChartDataModel<Tx, Ty>> data, string xAxisLabel, string yAxisLabel)
        {
            ChartModel<Tx, Ty> model = new ChartModel<Tx, Ty>();
            model.Data = data;

            model.XAxisLabel = xAxisLabel;
            model.YAxisLabel = yAxisLabel;

            return model;
        }
    }
}
