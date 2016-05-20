using MegaMine.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Core.Widgets
{
    public abstract class BaseWidgetDomain<T> where T: IRepository
    {
        protected T repository;

        public abstract Task<ChartModel<string, int>> GetWidgetData(int widgetId, WidgetOptions options);

        protected int CompanyId
        {
            get
            {
                return repository.AppContext.CompanyId;
            }
        }
    }
}
