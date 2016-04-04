using MegaMine.Core.Models;
using MegaMine.Services.Security.Entities;
using MegaMine.Services.Security.Repositories;
using System.Collections.Generic;

namespace MegaMine.Services.Security.Middleware
{
    public class PageService
    {
        public static List<IdentityPageEntity> Pages { get; set; }
        public static List<IdentityMenuPageEntity> MenuPages { get; set; }
        public static List<ListItem<string, string>> AdminRoles { get; set; }
        public static Dictionary<int, CompanyEntity> CompanyClaims { get; set; }

        public static void CachePageClaimsRoles(SecurityRepository repository)
        {
            Pages = repository.IdentityPagesGet();
            MenuPages = repository.IdentityMenuPagesGet();
            AdminRoles = repository.IdentityAdminRolesGet();

            CacheCompanyClaims(repository);
        }

        private static void CacheCompanyClaims(SecurityRepository repository)
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
