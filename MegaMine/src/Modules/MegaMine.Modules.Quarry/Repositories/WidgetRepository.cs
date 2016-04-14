using AutoMapper;
using MegaMine.Core.Models.Widgets;
using MegaMine.Core.Repositories;
using MegaMine.Modules.Quarry.Entities.Widget;
using Microsoft.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Quarry.Repositories
{
    public class WidgetRepository : BaseRepository<QuarryDbContext>
    {
        public WidgetRepository(QuarryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<PieChartModel> QuarryMaterialCounts()
        {
            return new PieChartModel()
            {
                Values = await dbContext.Set<QuarryMaterialCountEntity>().FromSql("quarry.WidgetQuarryMaterialCounts @CompanyId = {0}", context.CompanyId)
                                    .Select(m => Mapper.Map<QuarryMaterialCountEntity, ChartXYModel>(m)).ToListAsync()
            };
        }

        public async Task<List<BarChartModel>> QuarryProductTypeMaterialCounts()
        {
            List<QuarryProductTypeMaterialCountEntity> data = await dbContext.Set<QuarryProductTypeMaterialCountEntity>().FromSql("quarry.WidgetQuarryProductTypeMaterialCounts @CompanyId = {0}", context.CompanyId)
                                    .Select(m => m).ToListAsync();

            Dictionary<string, BarChartModel> dict = new Dictionary<string, BarChartModel>();


            foreach(var entity in data)
            {
                if(!dict.ContainsKey(entity.ProductTypeName))
                {
                    dict.Add(entity.ProductTypeName, new BarChartModel() { Key = entity.ProductTypeName, Values = new List<ChartXYModel>() });
                }

                dict[entity.ProductTypeName].Values.Add(
                        new ChartXYModel()
                        {
                            X = entity.QuarryName,
                            Y = entity.MaterialCount
                        }
                    );

            }

            return dict.Values.ToList();
        }
    }
}
