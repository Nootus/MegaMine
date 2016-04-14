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
                    return await QuarryMaterialCounts();
                case 3:
                    return await QuarryProductTypeMaterialCounts();
            }
            return null;
        }

        public async Task<PieChartModel> QuarryMaterialCounts()
        {
            return await widgetRepository.QuarryMaterialCounts();
        }

        public async Task<MultiBarChartModel> QuarryProductTypeMaterialCounts()
        {
            MultiBarChartModel model = new MultiBarChartModel();
            model.Bars = await widgetRepository.QuarryProductTypeMaterialCounts();

            model.XAxisLabel = "Top Quarries";
            model.YAxisLabel = "Blocks";

            return model;
        }
    }
}
