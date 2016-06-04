using System.Collections.Generic;

namespace MegaMine.Services.Security.Models
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
