using AutoMapper;
using MegaMine.Core.Repositories;
using MegaMine.Core.Widgets;
using MegaMine.Modules.Quarry.Entities.Widget;
using Microsoft.Data.Entity;
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

    }
}
