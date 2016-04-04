using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Services.Security.Entities
{
    [Table("IdentityCompanyClaim", Schema = "security")]
    public class IdentityCompanyClaimEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdentityCompanyClaimId { get; set; }

        public int CompanyId { get; set; }
        public int ClaimId { get; set; }

        [ForeignKey("ClaimId")]
        public IdentityClaimEntity Claim { get; set; }
    }
}
