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
            //checking for admin roles
            if (profile.Roles.Any(r => AccountSettings.SiteAdmin.Contains(r)))
            {
                menuClaims = pageClaims;
            }
            else
            {
                //checking for the module admins
                var rolequery = from claims in pageClaims
                             where profile.Roles.Contains(claims.Module + AccountSettings.AdminSuffix)
                             select claims;

                var roleClaims = rolequery.ToList();

                //checking for name
                var userquery = from claims in pageClaims
                                 join pc in profile.Claims on claims.Module equals pc.ClaimType
                             where claims.Claim == null || claims.Claim == pc.ClaimValue
                             select claims;

                var userClaims = userquery.ToList();

                menuClaims = roleClaims.Union(userClaims).ToList();
            }

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

//namespace SiloHost1
//{
//    public class Host
//    {
//        List<Data> lst = new List<Data>(){
//                new Data(){ id = 1, Text = "One", Module="N", Name = null, ParentId = null },
//                new Data(){ id = 2, Text = "One-1", Module="N", Name="N1", ParentId = 1 },
//                new Data(){ id = 3, Text = "One-2", Module="N", Name="N2", ParentId = 1 },
//                new Data(){ id = 4, Text = "One-3", Module="N", Name="N3", ParentId = 1 },
//                new Data(){ id = 5, Text = "One-4", Module="N", Name="N4", ParentId = 1 },
//                new Data(){ id = 6, Text = "One-5", Module="N", Name="N5", ParentId = 1 },
//                new Data(){ id = 7, Text = "One-6", Module="N", Name="N6", ParentId = 1 },
//                new Data(){ id = 8, Text = "One-7", Module="N", Name="N7", ParentId = 1 },
//                new Data(){ id = 9, Text = "Two", Module="O", Name = null, ParentId = null },
//                new Data(){ id = 2, Text = "Two-1", Module="O", Name="O1", ParentId = 9 },
//                new Data(){ id = 3, Text = "Two-2", Module="O", Name="O2", ParentId = 9 },
//                new Data(){ id = 4, Text = "Two-3", Module="O", Name="O3", ParentId = 9 },
//                new Data(){ id = 5, Text = "Two-4", Module="O", Name="O4", ParentId = 9 },
//                new Data(){ id = 6, Text = "Two-5", Module="O", Name="O5", ParentId = 9 },
//                new Data(){ id = 7, Text = "Two-6", Module="O", Name="O6", ParentId = 9 },
//            };

//        string[] ro = new string[] { "A", "B", "C" };

//        public void Process()
//        {
//            Console.WriteLine("Process started");


//            string[] inputro = new string[] { "OX", "NX" };
//            List<Data> input = new List<Data>(){
//                new Data(){Module="N", Name="N1"},
//                new Data(){Module="O", Name="O6"}
//            };

//            var final = GetData(inputro, input);

//            Console.WriteLine("Process Done");
//        }

//        public List<Data> GetData(string[] inputro, List<Data> input)
//        {
//            //checking for ro
//            if (inputro.Any(r => ro.Contains(r)))
//            {
//                return lst;
//            }

//            var rquery = from l in lst
//                         where inputro.Contains(l.Module + 'X')
//                         select l;

//            var rdata = rquery.ToList();

//            //checking for name
//            var cquery = from l in lst
//                         join i in input on l.Module equals i.Module
//                         where l.Name == null || l.Name == i.Name
//                         select l;

//            var cdata = cquery.ToList();

//            var final = rdata.Union(cdata).ToList();

//            //converting the data into tree view
//            List<Data> tree = final.Where(l => l.Name == null).ToList();

//            foreach (var t in tree)
//            {
//                t.Items = final.Where(l => l.ParentId == t.id).ToList();
//            }

//            return tree;
//        }

//        public class Data
//        {
//            public int id { get; set; }
//            public string Text { get; set; }
//            public string Module { get; set; }
//            public string Name { get; set; }
//            public int? ParentId { get; set; }
//            public List<Data> Items { get; set; }
//        }
//    }
//}

