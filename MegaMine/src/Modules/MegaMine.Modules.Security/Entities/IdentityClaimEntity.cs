using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Modules.Security.Entities
{
    [Table("IdentityClaim")]
    public class IdentityClaimEntity
    {
        [Key]
        public int Id { get; set; }
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
        public string Description { get; set; }

        public List<IdentityPageClaimEntity> Pages { get; set; }

        public override string ToString()
        {
            return ClaimType + " - " + ClaimValue;
        }
    }
}
