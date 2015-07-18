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
            List<MenuModel> menu = menuClaims.Select(claims => new MenuModel { text =  claims.Text, url = claims.Url, disabled = claims.Disabled,
                                                                                cssClass = claims.CssClass, spriteCssClass = claims.SpriteCssClass,
                                                                                parentId = claims.ParentId, pageId = claims.PageId, displayOrder = claims.DisplayOrder }
                                                    ).ToList();

            //converting this into tree
            List<MenuModel> treeMenu = menu.Where(m => m.parentId == null).OrderBy(o => o.displayOrder).ToList();

            foreach (var tree in treeMenu)
            {
                tree.items = menu.Where(m => m.parentId == tree.pageId).OrderBy(o => o.displayOrder).ToList();
            }

            profile.Menu = treeMenu;
        }
    }
}

