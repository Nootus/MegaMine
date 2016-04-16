using MegaMine.Core.Models.Widgets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Core.Widget
{
    public static class ChartFactory
    {
        public static MultiChartModel<string, Ty> CreateMultiChart<Ty>(List<ChartDataModel<string, Ty>> data, string xAxisLabel, string yAxisLabel)
        {
            MultiChartModel<string, Ty> model = (MultiChartModel<string, Ty>) CreateChartModel(new MultiChartModel<string, Ty>(), data, xAxisLabel, yAxisLabel); 

            //setting up the x data axis labels
            model.XAxisDataLabels = SetXAsisDataLables(model.Data);

            return model;
        }

        private static ChartModel<Tx, Ty> CreateChartModel<Tx, Ty>(ChartModel<Tx, Ty> model, List<ChartDataModel<Tx, Ty>> data, string xAxisLabel, string yAxisLabel)
        {
            //ensuring that all X exist in the data
            IEnumerable<Tx> xList = data.SelectMany(m => m.Values).Select(v => v.X).Distinct();
            foreach (var item in data)
            {
                IEnumerable<Tx> missing = xList.Except(item.Values.Select(v => v.X));
                //adding the missing
                foreach (var missValue in missing)
                {
                    item.Values.Add(new ChartPointModel<Tx, Ty>() { X = missValue, Y = default(Ty) });
                }
                item.Values = item.Values.OrderBy(o => o.X).ToList();
            }

            model.Data = data;
            model.XAxisLabel = xAxisLabel;
            model.YAxisLabel = yAxisLabel;

            return model;
        }

        private static List<string> SetXAsisDataLables<Ty>(List<ChartDataModel<string, Ty>> data)
        {
            List<string> dataLabels = new List<string>();
            int index = -1;

            foreach(var item in data)
            {
                foreach(var value in item.Values)
                {
                    string x = value.X;
                    index = dataLabels.IndexOf(x);
                    if(index == -1)
                    {
                        dataLabels.Add(x);
                        index = dataLabels.Count - 1;
                    }

                    value.X = index.ToString();
                }
            }

            return dataLabels;
        }
    }
}
