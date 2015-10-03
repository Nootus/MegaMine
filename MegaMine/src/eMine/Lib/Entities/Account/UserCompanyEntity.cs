using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eMine.Lib.Entities.Account
{
    [Table("UserCompany")]
    public class UserCompanyEntity
    {
        [Key]
        public string UserProfileId { get; set; }
        [Key]
        public int CompanyId { get; set; }
    }
}
