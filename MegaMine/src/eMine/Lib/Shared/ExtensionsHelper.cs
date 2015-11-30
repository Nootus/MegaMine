using eMine.Lib.Entities.Account;
using eMine.Lib.Middleware;
using eMine.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Shared
{
    public static class ExtensionsHelper
    {
        public static void SetMenu(this ProfileModel profile)
        {
            List<IdentityPageEntity> pages = PageService.Pages;
            List<IdentityPageEntity> menuClaims;

            //checking for the admins
            var rolequery = from page in pages
                            where profile.Roles.Any(r => page.PageClaims.Any(p => r == p.ClaimType + AccountSettings.AdminSuffix))
                            && page.MenuInd == true
                            select page;

            var roleClaims = rolequery.ToList();

            //checking for name
            var userquery = from page in pages
                            where page.MenuInd == true
                            && page.Claims.Any(p => profile.Claims.Any(c => p.PrimaryClaimInd == true && (c.ClaimType == p.ClaimType || (c.ClaimType == p.Claim.ClaimType && c.ClaimValue == p.Claim.ClaimValue))))
                            select page;

                            //join pc in profile.Claims on page.Claims.Any(c => c.Claim.ClaimType .Module equals pc.ClaimType
                            //where page.Claim == null || page.Claim == pc.ClaimValue
                            //&& page.MenuInd == true
                            //select page;

            var userClaims = userquery.ToList();

            menuClaims = roleClaims.Union(userClaims).ToList();

            //getting the menu model
            List<MenuModel> menu = menuClaims.Select(claims => new MenuModel { Text =  claims.Text, Url = claims.Url, Disabled = claims.Disabled,
                                                                                CssClass = claims.CssClass, SpriteCssClass = claims.SpriteCssClass,
                                                                                ParentId = claims.ParentId, PageId = claims.PageId, DisplayOrder = claims.DisplayOrder }
                                                    ).ToList();

            //converting this into tree
            List<MenuModel> treeMenu = menu.Where(m => m.ParentId == null).OrderBy(o => o.DisplayOrder).ToList();

            foreach (var tree in treeMenu)
            {
                tree.Items = menu.Where(m => m.ParentId == tree.PageId).OrderBy(o => o.DisplayOrder).ToList();
            }

            profile.Menu = treeMenu;
        }
    }
}

