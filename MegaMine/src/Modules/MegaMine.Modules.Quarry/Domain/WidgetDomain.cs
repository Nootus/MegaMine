using MegaMine.Core.Models.Widgets;
using MegaMine.Core.Widget;
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
                case 1:
                    return await QuarryProductTypeMaterialCounts();
                case 2:
                    return await QuarryMaterialCounts();
                case 3:
                    return await QuarryProductTypeMaterialCounts();
            }
            return null;
        }

        public async Task<ChartDataModel<string, int>> QuarryMaterialCounts()
        {
            return await widgetRepository.QuarryMaterialCounts();
        }

        public async Task<ChartModel<string, int>> QuarryProductTypeMaterialCounts()
        {
            return ChartFactory.CreateChartModel(await widgetRepository.QuarryProductTypeMaterialCounts(), "Top Quarries", "Blocks");
        }
    }
}
