using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Lib.Entities.Account
{
    [Table("IdentityMenuPage")]
    public class IdentityMenuPageEntity
    {
        [Key]
        public int IdentityMenuPageId { get; set; }

        public int PageId { get; set; }
        public string MenuText { get; set; }
        public int? ParentPageId { get; set; }
        public bool GroupMenuInd { get; set; }
        public int DisplayOrder { get; set; }
        public string Url { get; set; }
        public string IconCss { get; set; }
        public bool DeletedInd { get; set; }
    }
}
