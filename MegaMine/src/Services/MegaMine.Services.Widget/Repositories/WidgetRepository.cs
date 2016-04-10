using System;
using System.Collections.Generic;
using MegaMine.Core.Repositories;
using MegaMine.Services.Widget.Models;
using MegaMine.Services.Widget.Entities;
using System.Linq;
using AutoMapper;
using Microsoft.Data.Entity;
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
            return await GetListAsync<DashboardPageWidgetEntity, PageWidgetModel, int>(where => where.DashboardId == dashboardId, order => order.DashboardPageWidgetId);
        }
    }
}
