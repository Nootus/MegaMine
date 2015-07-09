using eMine.Lib.Entities.Account;
using eMine.Lib.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Middleware
{
    public class PageService
    {
        public static List<IdentityPageEntity> PageClaims { get; set; }

        public static void CachePageClaims(AccountRepository repository)
        {
            PageClaims = repository.IdentityPagesGet();
        }
    }
}
