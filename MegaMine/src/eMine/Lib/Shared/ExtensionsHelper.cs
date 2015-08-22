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
            List<IdentityPageEntity> pageClaims = PageService.PageClaims;
            List<IdentityPageEntity> menuClaims;

            //checking for the admins
            var rolequery = from claims in pageClaims
                            where profile.Roles.Contains(claims.Module + AccountSettings.AdminSuffix)
                            && claims.MenuInd == true
                            select claims;

            var roleClaims = rolequery.ToList();

            //checking for name
            var userquery = from claims in pageClaims
                                join pc in profile.Claims on claims.Module equals pc.ClaimType
                            where claims.Claim == null || claims.Claim == pc.ClaimValue
                            && claims.MenuInd == true
                            select claims;

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

