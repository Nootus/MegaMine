using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Account
{
    public class MenuModel
    {
        public string Text { get; set; }
        public string Url { get; set; }
        public string Disabled { get; set; }
        public string CssClass { get; set; }
        public string SpriteCssClass { get; set; }
        public int? ParentId { get; set; }
        public int PageId { get; set; }
        public int DisplayOrder { get; set; }

        public List<MenuModel> Items { get; set; }
    }
}
