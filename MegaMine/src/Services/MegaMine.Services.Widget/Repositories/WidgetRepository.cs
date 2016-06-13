using AutoMapper;
using MegaMine.Core.Repositories;
using MegaMine.Services.Widget.Entities;
using MegaMine.Core.Models.Widget;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Services.Widget.Repositories
{
    public class WidgetRepository : BaseRepository<WidgetDbContext>
    {
        public WidgetRepository(WidgetDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<int> GetDashboardId(int pageId)
        {
            DashboardEntity entity = await GetSingleAsync<DashboardEntity>(ent => ent.PageId == pageId);
            return entity.DashboardId;
        }

        public async Task<List<WidgetModel>> WidgetsGet(int dashboardId)
        {
            var query = from dashwid in dbContext.DashboardWidgets 
                         join wid in dbContext.Widgets.Include(w => w.Chart) on dashwid.WidgetId equals wid.WidgetId
                         where dashwid.DashboardId == dashboardId
                        select wid;

            List<WidgetEntity> entites = await query.ToListAsync();


            return Mapper.Map<List<WidgetEntity>, List<WidgetModel>>(entites);
        }

        public async Task<List<PageWidgetModel>> PageWidgetsGet(int dashboardId)
        {
            return (await GetListAsync<DashboardPageWidgetEntity, PageWidgetModel, int>(where => where.DashboardId == dashboardId, order => order.DashboardPageWidgetId)).OrderBy(o => o.WidgetOptions.Rows).ThenBy(o => o.WidgetOptions.Columns).ToList();
        }
    }
}
