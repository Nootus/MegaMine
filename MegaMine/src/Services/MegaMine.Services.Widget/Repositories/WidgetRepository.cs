using MegaMine.Core.Repositories;

namespace MegaMine.Services.Widget.Repositories
{
    public class WidgetRepository : BaseRepository<WidgetDbContext>
    {
        public WidgetRepository(WidgetDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
    }
}
