using MegaMine.Modules.Shared.Models;
using MegaMine.Modules.Shared.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Shared.Domain
{
    public class SharedDomain
    {
        private SharedRepository sharedRepository;
        public SharedDomain(SharedRepository sharedRepository)
        {
            this.sharedRepository = sharedRepository;
        }

        #region Blocks
        public async Task<List<BlockStateModel>> BlockStatesGet(string[] blockNumbers)
        {
            return await sharedRepository.BlockStatesGet(blockNumbers);
        }

        public async Task BlockStateSave(BlockStateModel model)
        {
            await sharedRepository.BlockStateSave(model);
        }
        public async Task BlockStatesSave(List<BlockStateModel> model)
        {
            await sharedRepository.BlockStatesSave(model);
        }
        #endregion
    }
}
