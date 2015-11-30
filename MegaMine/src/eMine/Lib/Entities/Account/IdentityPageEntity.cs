using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace eMine.Lib.Entities.Account
{
    [Table("IdentityPage")]
    public class IdentityPageEntity
    {
        [Key]
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

        public ICollection<IdentityPageClaimEntity> Claims { get; set; }

        public IEnumerable<IdentityClaimEntity> PageClaims
        {
            get
            {
                return Claims.Select(s => s.Claim);
            }
        }
    }
}
