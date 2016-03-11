using MegaMine.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MegaMine.Modules.Shared.Repositories
{
    public class SharedRepository : BaseRepository<SharedDbContext>
    {
        public SharedRepository(SharedDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
    }
}
