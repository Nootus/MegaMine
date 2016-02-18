using AutoMapper;
using MegaMine.Web.Lib.Entities.Account;
using MegaMine.Web.Lib.Entities.Administration;
using MegaMine.Web.Lib.Middleware;
using MegaMine.Web.Models.Account;
using System.Collections.Generic;
using System.Linq;

namespace MegaMine.Web.Lib.Shared
{
    public static class ExtensionsHelper
    {
        public static void SetMenu(this ProfileModel profile)
        {
            List<IdentityPageEntity> pages = PageService.Pages;
            List<IdentityMenuPageEntity> menuPages = PageService.MenuPages;
            CompanyEntity companyClaims = PageService.CompanyClaims[profile.CompanyId];
            List<IdentityMenuPageEntity> allPages;

            //checking for the module admins
            var rolequery = from menupage in menuPages
                            join page in pages on menupage.PageId equals page.PageId
                            where profile.AdminRoles.Any(r => page.PageClaims.Any(p => r == p.ClaimType + AccountSettings.AdminSuffix))
                            select menupage;

            var rolePages = rolequery.ToList();

            //checking for name
            var userquery = from menupage in menuPages
                            join page in pages on menupage.PageId equals page.PageId
                            where page.Claims.Any(p => profile.Claims.Any(c => p.PrimaryClaimInd == true && c.ClaimType == p.Claim.ClaimType && (p.Claim.ClaimValue == AccountSettings.AnonymousClaim || c.ClaimValue == p.Claim.ClaimValue)))
                            select menupage;

            var userPages = userquery.ToList();

            allPages = rolePages.Union(userPages).ToList();

            var qry = from all in allPages 
                      join page in pages on all.PageId equals page.PageId
                      where page.Claims.Any(p => companyClaims.Claims.Any(c => c.Claim.ClaimType == p.Claim.ClaimType && (p.Claim.ClaimValue == AccountSettings.AnonymousClaim || c.Claim.ClaimValue == p.Claim.ClaimValue)))
                      select all;

            allPages = qry.ToList();

            //getting the menu model
            List<MenuModel> menu = allPages.Select(page => Mapper.Map<IdentityMenuPageEntity, MenuModel>(page)).ToList();

            //converting this into tree
            List<MenuModel> treeMenu = menu.Where(m => m.ParentPageId == null).OrderBy(o => o.DisplayOrder).ToList();

            foreach (var tree in treeMenu)
            {
                tree.Items = menu.Where(m => m.ParentPageId == tree.PageId).OrderBy(o => o.DisplayOrder).ToList();
                //checking whether the last one is group menu and removing it
                if (tree.Items[tree.Items.Count - 1].GroupMenuInd)
                    tree.Items.RemoveAt(tree.Items.Count - 1);
            }

            profile.Menu = treeMenu;
        }
    }
}

