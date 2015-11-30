using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eMine.Lib.Entities.Account
{
    [Table("IdentityPageClaim")]
    public class IdentityPageClaimEntity
    {
        [Key]
        public int Id { get; set; }
        public int PageId { get; set; }
        public int ClaimId { get; set; }
        public bool PrimaryClaimInd { get; set; }
        //public string ClaimType { get; set; }

        [ForeignKey("ClaimId")]
        public IdentityClaimEntity Claim { get; set; }

        [ForeignKey("PageId")]
        public IdentityPageEntity Page { get; set; }

        public override string ToString()
        {
            return Page.Text + " - " + Claim.ClaimType + " - " + Claim.ClaimValue;
        }
    }
}
