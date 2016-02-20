using MegaMine.Models.Common;
using MegaMine.Web.Lib.Entities;
using MegaMine.Web.Lib.Entities.Account;
using MegaMine.Web.Lib.Entities.Administration;
using MegaMine.Web.Lib.Repositories;
using MegaMine.Web.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Lib.Middleware
{
    public class PageService
    {
        public static List<IdentityPageEntity> Pages { get; set; }
        public static List<IdentityMenuPageEntity> MenuPages { get; set; }
        public static List<ListItem<string, string>> AdminRoles { get; set; }
        public static Dictionary<int, CompanyEntity> CompanyClaims { get; set; }

        public static void CachePageClaimsRoles(AccountRepository repository)
        {
            Pages = repository.IdentityPagesGet();
            MenuPages = repository.IdentityMenuPagesGet();
            AdminRoles = repository.IdentityAdminRolesGet();

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
