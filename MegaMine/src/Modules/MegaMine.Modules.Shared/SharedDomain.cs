using MegaMine.Modules.Shared.Models;
using MegaMine.Modules.Shared.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Shared
{
    public class SharedDomain
    {
        private SharedRepository sharedRepository;
        public SharedDomain(SharedRepository sharedRepository)
        {
            this.sharedRepository = sharedRepository;
        }

        #region Blocks
        public async Task<string[]> GetExcavateValidBlocks(string[] blockNumbers)
        {
            return await sharedRepository.GetValidBlocks(blockNumbers, (int)State.Excavate);
        }
        #endregion
    }
}
