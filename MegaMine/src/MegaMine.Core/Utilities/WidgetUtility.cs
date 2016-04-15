using MegaMine.Core.Models.Widgets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace MegaMine.Core.Utilities
{
    public static class WidgetUtility
    {

        public static List<ChartDataModel<Tx, Ty>> MapChartData<TEntity, Tx, Ty>(List<TEntity> data, string keyField, string xField, string yField)
        {
            Dictionary<string, ChartDataModel<Tx, Ty>> dict = new Dictionary<string, ChartDataModel<Tx, Ty>>();

            PropertyInfo keyProperty = typeof(TEntity).GetProperty(keyField);
            PropertyInfo xProperty = typeof(TEntity).GetProperty(xField);
            PropertyInfo yProperty = typeof(TEntity).GetProperty(yField);

            foreach (var entity in data)
            {
                string key = (string)keyProperty.GetValue(entity);
                Tx x = (Tx)xProperty.GetValue(entity);
                Ty y = (Ty)Convert.ChangeType(yProperty.GetValue(entity), typeof(Ty));

                if (!dict.ContainsKey(key))
                {
                    dict.Add(key, new ChartDataModel<Tx, Ty>() { Key = key, Values = new List<ChartPointModel<Tx, Ty>>() });
                }

                dict[key].Values.Add(
                        new ChartPointModel<Tx, Ty>()
                        {
                            X = x,
                            Y = y
                        }
                    );

            }

            return dict.Values.ToList();
        }
        //public static List<ChartDataModel<Tx, Ty>> MapChartData<TEntity, Tx, Ty>(List<TEntity> data, string keyField, string xField, string yField)
        //{
        //}
    }
}
