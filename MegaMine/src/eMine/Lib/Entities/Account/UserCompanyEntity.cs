using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eMine.Lib.Entities.Account
{
    [Table("UserCompany")]
    public class UserCompanyEntity
    {
        public string UserProfileId { get; set; }
        public int CompanyId { get; set; }
    }
}
