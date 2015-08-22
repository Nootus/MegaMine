using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities.Account
{
    public class IdentityPageEntity
    {
        public int PageId { get; set; }
        public string Text { get; set; }
        public string Url { get; set; }
        public string CssClass { get; set; }
        public string SpriteCssClass { get; set; }
        public string Disabled { get; set; }
        public int? ParentId { get; set; }
        public bool MenuInd { get; set; }
        public int DisplayOrder { get; set; }
        public string Module { get; set; }
        public string Claim { get; set; }
        public string Controller { get; set; }
        public string ActionMethod { get; set; }
    }
}
