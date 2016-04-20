using MegaMine.Core.Repositories;
using Microsoft.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Core.Widgets
{
    public static class ChartFactory
    {
        public static async Task<MultiChartModel<Tx, Ty>> Create<Tx, Ty>(WidgetOptions options, BaseDbContext dbContext, string sql, params object[] parameters)
        {
            List<ChartEntity<Tx, Ty>> data = await dbContext.Set<ChartEntity<Tx, Ty>>().FromSql(sql, parameters)
                                    .Select(m => m).ToListAsync();

            return CreateMultiChartModel<Tx, Ty>(data, options.XAxisLabel, options.YAxisLabel);
        }

        private static MultiChartModel<Tx, Ty> CreateMultiChartModel<Tx, Ty>(List<ChartEntity<Tx, Ty>> data, string xAxisLabel, string yAxisLabel)
        {
            List<ChartDataModel<Tx, Ty>> dataModel = MapChartData<Tx, Ty>(data);

            MultiChartModel<Tx, Ty> model = (MultiChartModel<Tx, Ty>) CreateChartModel(new MultiChartModel<Tx, Ty>(), dataModel, xAxisLabel, yAxisLabel); 

            //setting up the x data axis labels
            model.XAxisDataLabels = SetXAsisDataLables(model.Data);

            return model;
        }

        private static List<ChartDataModel<Tx, Ty>> MapChartData<Tx, Ty>(List<ChartEntity<Tx, Ty>> data)
        {
            Dictionary<string, ChartDataModel<Tx, Ty>> dict = new Dictionary<string, ChartDataModel<Tx, Ty>>();

            foreach (var entity in data)
            {
                string key = entity.Key;

                if (!dict.ContainsKey(key))
                {
                    dict.Add(key, new ChartDataModel<Tx, Ty>() { Key = key, Order = entity.KeyOrder, Values = new List<ChartPointModel<Tx, Ty>>() });
                }

                dict[key].Values.Add(
                        new ChartPointModel<Tx, Ty>()
                        {
                            X = entity.X,
                            Y = entity.Y,
                            Order = entity.XOrder
                        }
                    );

            }

            return dict.Values.ToList();
        }

        private static ChartModel<Tx, Ty> CreateChartModel<Tx, Ty>(ChartModel<Tx, Ty> model, List<ChartDataModel<Tx, Ty>> data, string xAxisLabel, string yAxisLabel)
        {
            //ensuring that all X exist in the data
            IEnumerable<Tx> xList = data.SelectMany(m => m.Values).Select(v => v.X).Distinct();
            Ty defaultValue = default(Ty);
            

            foreach (var item in data)
            {
                IEnumerable<Tx> missing = xList.Except(item.Values.Select(v => v.X));
                //adding the missing
                foreach (var missValue in missing)
                {
                    item.Values.Add(new ChartPointModel<Tx, Ty>() { X = missValue, Y = defaultValue });
                }
                item.Values = item.Values.OrderBy(o => o.Order).ThenBy(o => o.X).ToList();
                //item.Values = item.Values.OrderBy(o => o.X).ToList();
            }

            model.Data = data;
            model.XAxisLabel = xAxisLabel;
            model.YAxisLabel = yAxisLabel;

            return model;
        }

        private static List<Tx> SetXAsisDataLables<Tx, Ty>(List<ChartDataModel<Tx, Ty>> data)
        {
            List<Tx> dataLabels = new List<Tx>();
            int index = -1;

            foreach(var item in data)
            {
                foreach(var value in item.Values)
                {
                    Tx x = value.X;
                    index = dataLabels.IndexOf(x);
                    if(index == -1)
                    {
                        dataLabels.Add(x);
                        index = dataLabels.Count - 1;
                    }

                    value.X = (Tx) Convert.ChangeType(index.ToString(), typeof(Tx));
                }
            }

            return dataLabels;
        }
    }
}
