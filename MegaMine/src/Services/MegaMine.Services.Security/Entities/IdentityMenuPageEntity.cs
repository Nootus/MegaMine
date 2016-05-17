using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Services.Security.Entities
{
    [Table("IdentityMenuPage", Schema = "security")]
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
