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

        public int QuarryMaterialCountWidget { get; private set; }

        public async Task<PieChartModel> QuarryMaterialCounts()
        {
            return new PieChartModel()
            {
                XY = await dbContext.Set<QuarryMaterialCountEntity>().FromSql("quarry.WidgetQuarryMaterialCounts @CompanyId = {0}", context.CompanyId)
                                    .Select(m => Mapper.Map<QuarryMaterialCountEntity, ChartXYModel>(m)).ToListAsync()
            };
        }
    }
}
