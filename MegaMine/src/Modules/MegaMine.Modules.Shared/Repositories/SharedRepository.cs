using MegaMine.Core.Repositories;
using MegaMine.Modules.Shared.Models;
using Microsoft.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Shared.Repositories
{
    public class SharedRepository : BaseRepository<SharedDbContext>
    {
        public SharedRepository(SharedDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<string[]> GetValidBlocks(string[] blockNumbers, int state)
        {
            var query = from bs in dbContext.BlockStates
                        where blockNumbers.Contains(bs.BlockNumber)
                        && bs.State == state
                        && bs.CompanyId == profile.CompanyId
                        && bs.DeletedInd == false
                        select bs.BlockNumber;

            return await query.ToArrayAsync();
        }
    }
}
