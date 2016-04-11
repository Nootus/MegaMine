using MegaMine.Core.Models.Widgets;
using MegaMine.Modules.Quarry.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Quarry.Domain
{
    public class WidgetDomain
    {
        private WidgetRepository widgetRepository;
        public WidgetDomain(WidgetRepository widgetRepository)
        {
            this.widgetRepository = widgetRepository;
        }
        public async Task<object> GetWidgetData(int widgetId)
        {
            switch (widgetId)
            {
                case 2:
                    return await QuarryCounts();
            }
            return null;
        }

        public async Task<List<PieChartModel>> QuarryCounts()
        {
            return await widgetRepository.QuarryMaterialCounts();
        }
    }
}
