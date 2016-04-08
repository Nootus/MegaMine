using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Services.Security.Entities
{
    [Table("IdentityPageClaim", Schema = "security")]
    public class IdentityPageClaimEntity
    {
        [Key]
        public int Id { get; set; }
        public int PageId { get; set; }
        public int ClaimId { get; set; }
        public bool PrimaryClaimInd { get; set; }

        [ForeignKey("ClaimId")]
        public IdentityClaimEntity Claim { get; set; }

        //[ForeignKey("PageId")]
        //public IdentityPageEntity Page { get; set; }
    }
}
