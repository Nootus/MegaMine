using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace MegaMine.Modules.Security.Entities
{
    [Table("IdentityPage")]
    public class IdentityPageEntity
    {
        [Key]
        public int PageId { get; set; }
        public string Text { get; set; }
        public string Controller { get; set; }
        public string ActionMethod { get; set; }

        public List<IdentityPageClaimEntity> Claims { get; set; }

        public IEnumerable<IdentityClaimEntity> PageClaims
        {
            get
            {
                return Claims.Select(s => s.Claim);
            }
        }

        public override string ToString()
        {
            return Text;
        }
    }
}
