using MegaMine.Core.Models.Widgets;
using MegaMine.Core.Repositories;
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

        public async Task<List<PieChartModel>> QuarryCounts()
        {
            //TODO: Bug in RC1 cannot use join with group, so doing two queries 
            var query = from mat in dbContext.Materials
                        group mat by mat.QuarryId into grp
                        select new PieChartModel
                        {
                            Key = grp.Key.ToString(),
                            Y = grp.Count()
                        };
            return await query.ToListAsync();
        }
    }
}
