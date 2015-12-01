using AutoMapper;
using eMine.Lib.Entities.Account;
using eMine.Lib.Middleware;
using eMine.Models.Account;
using System.Collections.Generic;
using System.Linq;

namespace eMine.Lib.Shared
{
    public static class ExtensionsHelper
    {
        public static void SetMenu(this ProfileModel profile)
        {
            List<IdentityPageEntity> pages = PageService.Pages;
            List<IdentityPageEntity> menuPages;

            //checking for the admins
            var rolequery = from page in pages
                            where profile.Roles.Any(r => page.PageClaims.Any(p => r == p.ClaimType + AccountSettings.AdminSuffix))
                            && page.MenuInd == true
                            select page;

            var rolePages = rolequery.ToList();

            //checking for name
            var userquery = from page in pages
                            where page.MenuInd == true
                            && page.Claims.Any(p => profile.Claims.Any(c => p.PrimaryClaimInd == true && c.ClaimType == p.Claim.ClaimType && (p.Claim.ClaimValue == AccountSettings.AnonymousClaim || c.ClaimValue == p.Claim.ClaimValue)))
                            select page;

            var userPages = userquery.ToList();

            menuPages = rolePages.Union(userPages).ToList();

            //getting the menu model
            List<MenuModel> menu = menuPages.Select(page => Mapper.Map<IdentityPageEntity, MenuModel>(page)).ToList();

            //converting this into tree
            List<MenuModel> treeMenu = menu.Where(m => m.ParentId == null).OrderBy(o => o.DisplayOrder).ToList();

            foreach (var tree in treeMenu)
            {
                tree.Items = menu.Where(m => m.ParentId == tree.PageId).OrderBy(o => o.DisplayOrder).ToList();
                //checking whether the last one is group menu and removing it
                if (tree.Items[tree.Items.Count - 1].GroupMenuInd)
                    tree.Items.RemoveAt(tree.Items.Count - 1);
            }

            profile.Menu = treeMenu;
        }
    }
}

