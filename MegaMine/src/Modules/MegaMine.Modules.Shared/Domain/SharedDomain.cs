//-------------------------------------------------------------------------------------------------
// <copyright file="SharedDomain.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Businss logic
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Shared.Domain
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MegaMine.Modules.Shared.Models;
    using MegaMine.Modules.Shared.Repositories;

    public class SharedDomain
    {
        private SharedRepository sharedRepository;

        public SharedDomain(SharedRepository sharedRepository)
        {
            this.sharedRepository = sharedRepository;
        }

        // blocks
        public async Task<List<BlockStateModel>> BlockStatesGet(string[] blockNumbers)
        {
            return await this.sharedRepository.BlockStatesGet(blockNumbers);
        }

        public async Task BlockStateSave(BlockStateModel model)
        {
            await this.sharedRepository.BlockStateSave(model);
        }

        public async Task BlockStatesSave(List<BlockStateModel> model)
        {
            await this.sharedRepository.BlockStatesSave(model);
        }
    }
}
