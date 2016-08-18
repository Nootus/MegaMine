using MegaMine.Core.Repositories;
using MegaMine.Modules.Shared.Entities;
using MegaMine.Modules.Shared.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Shared.Repositories
{
    public class SharedRepository : BaseRepository<SharedDbContext>
    {
        public SharedRepository(SharedDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public async Task<List<BlockStateModel>> BlockStatesGet(string[] blockNumbers)
        {
            return await GetListAsync<BlockStateEntity, BlockStateModel>(e => blockNumbers.Contains(e.BlockNumber), s => s.BlockNumber);
        }

        public async Task BlockStateSave(BlockStateModel model)
        {
            await SaveEntity<BlockStateEntity, BlockStateModel>(model);
        }
        public async Task BlockStatesSave(List<BlockStateModel> models)
        {
            foreach(var model in models)
            {
                await SaveEntity<BlockStateEntity, BlockStateModel>(model, false);
            }
            await this.DbContext.SaveChangesAsync();
        }
    }
}
