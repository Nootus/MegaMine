﻿//-------------------------------------------------------------------------------------------------
// <copyright file="PageService.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Service used to cache the data necessary for each page
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Security.Middleware
{
    using System.Collections.Generic;
    using MegaMine.Core.Models;
    using MegaMine.Services.Security.Entities;
    using MegaMine.Services.Security.Models;
    using MegaMine.Services.Security.Repositories;

    public class PageService
    {
        public static List<PageModel> Pages { get; set; }

        public static List<MenuModel> MenuPages { get; set; }

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
