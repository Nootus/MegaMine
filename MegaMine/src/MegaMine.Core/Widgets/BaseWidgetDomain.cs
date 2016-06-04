using MegaMine.Core.Repositories;
using System.Threading.Tasks;

namespace MegaMine.Core.Widgets
{
    public abstract class BaseWidgetDomain
    {
        protected IRepository repository;

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
