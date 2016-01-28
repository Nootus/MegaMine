using eMine.Lib.Entities;
using eMine.Lib.Entities.Account;
using eMine.Lib.Entities.Administration;
using eMine.Lib.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Middleware
{
    public class PageService
    {
        public static List<IdentityPageEntity> Pages { get; set; }
        public static List<IdentityMenuPageEntity> MenuPages { get; set; }
        public static List<ListItem<string, string>> Roles { get; set; }
        public static Dictionary<int, CompanyEntity> CompanyClaims { get; set; }

        public static void CachePageClaimsRoles(AccountRepository repository)
        {
            Pages = repository.IdentityPagesGet();
            MenuPages = repository.IdentityMenuPagesGet();
            Roles = repository.IdentityRolesGet();

            CacheCompanyClaims(repository);
        }

        private static void CacheCompanyClaims(AccountRepository repository)
        {
            var companies = repository.IdentityCompanyClaimsGet();
            CompanyClaims = new Dictionary<int, CompanyEntity>();
            foreach (var company in companies)
            {
                CompanyClaims.Add(company.CompanyId, company);
            }
        }
    }
}
