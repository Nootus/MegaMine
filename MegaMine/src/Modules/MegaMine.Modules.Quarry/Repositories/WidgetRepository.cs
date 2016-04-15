using AutoMapper;
using MegaMine.Core.Models.Widgets;
using MegaMine.Core.Repositories;
using MegaMine.Core.Utilities;
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

        public async Task<ChartDataModel<string, int>> QuarryMaterialCounts()
        {
            return new ChartDataModel<string, int>()
            {
                Values = await dbContext.Set<QuarryMaterialCountEntity>().FromSql("quarry.WidgetQuarryMaterialCounts @CompanyId = {0}", context.CompanyId)
                                    .Select(m => Mapper.Map<QuarryMaterialCountEntity, ChartPointModel<string, int>>(m)).ToListAsync()
            };
        }

        public async Task<List<ChartDataModel<string, int>>> QuarryProductTypeMaterialCounts()
        {
            List<QuarryProductTypeMaterialCountEntity> data = await dbContext.Set<QuarryProductTypeMaterialCountEntity>().FromSql("quarry.WidgetQuarryProductTypeMaterialCounts @CompanyId = {0}", context.CompanyId)
                                    .Select(m => m).ToListAsync();

            return WidgetUtility.MapChartData<QuarryProductTypeMaterialCountEntity, string, int>(data, "ProductTypeName", "QuarryName", "MaterialCount");

        }
    }
}
