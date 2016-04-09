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

        public async Task<List<WidgetModel>> PageWidgetsGet(int pageId)
        {
            var query = from dash in dbContext.Dashboards
                         join dashwid in dbContext.DashboardWidgets on dash.DashboardId equals dashwid.DashboardId
                         join wid in dbContext.Widgets.Include(w => w.Chart) on dashwid.WidgetId equals wid.WidgetId
                         where dash.PageId == pageId
                         select wid;

            List<WidgetEntity> entites = await query.ToListAsync();


            return Mapper.Map<List<WidgetEntity>, List<WidgetModel>>(entites);
        }
    }
}
