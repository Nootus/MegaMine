using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Account
{
    public class MenuModel
    {
        public string text { get; set; }
        public string url { get; set; }
        public string disabled { get; set; }
        public string cssClass { get; set; }
        public string spriteCssClass { get; set; }
        public int? parentId { get; set; }
        public int pageId { get; set; }
        public int displayOrder { get; set; }

        public List<MenuModel> items { get; set; }
    }
}
