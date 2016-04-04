using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Security.Models
{
    public class MenuModel
    {
        public int PageId { get; set; }
        public string MenuText { get; set; }
        public int? ParentPageId { get; set; }
        public bool GroupMenuInd { get; set; }
        public int DisplayOrder { get; set; }
        public string Url { get; set; }
        public string IconCss { get; set; }

        public List<MenuModel> Items { get; set; }
    }
}
