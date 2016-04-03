using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Modules.Security.Entities
{
    [Table("UserCompany", Schema = "security")]
    public class UserCompanyEntity
    {
        public string UserProfileId { get; set; }
        public int CompanyId { get; set; }
    }
}
