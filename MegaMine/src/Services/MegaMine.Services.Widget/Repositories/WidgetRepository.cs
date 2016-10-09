//-------------------------------------------------------------------------------------------------
// <copyright file="WidgetRepository.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  This is used to fetch the widgets data to show in the UI
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Widget.Repositories
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoMapper;
    using MegaMine.Core.Models.Widget;
    using MegaMine.Core.Repositories;
    using MegaMine.Services.Widget.Entities;
    using Microsoft.EntityFrameworkCore;

    public class WidgetRepository : BaseRepository<WidgetDbContext>
    {
        public WidgetRepository(WidgetDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public async Task<int> GetDashboardId(int pageId)
        {
            DashboardEntity entity = await this.SingleAsync<DashboardEntity>(ent => ent.PageId == pageId);
            return entity.DashboardId;
        }

        public async Task<List<WidgetModel>> WidgetsGet(int dashboardId)
        {
            var query = from dashwid in this.DbContext.DashboardWidgets
                         join wid in this.DbContext.Widgets.Include(w => w.Chart) on dashwid.WidgetId equals wid.WidgetId
                         where dashwid.DashboardId == dashboardId
                        select wid;

            List<WidgetEntity> entites = await query.ToListAsync();

            return Mapper.Map<List<WidgetEntity>, List<WidgetModel>>(entites);
        }

        public async Task<List<PageWidgetModel>> PageWidgetsGet(int dashboardId)
        {
            return (await this.GetListAsync<DashboardPageWidgetEntity, PageWidgetModel, int>(where => where.DashboardId == dashboardId, order => order.DashboardPageWidgetId)).OrderBy(o => o.WidgetOptions.Rows).ThenBy(o => o.WidgetOptions.Columns).ToList();
        }
    }
}
