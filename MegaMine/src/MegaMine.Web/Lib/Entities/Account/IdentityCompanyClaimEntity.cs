using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Lib.Entities.Account
{
    [Table("IdentityCompanyClaim")]
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
