using MegaMine.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Web.Lib.Entities.Account
{
    [Table("UserProfile")]
    public class UserProfileEntity : BaseEntity
    {
        [Key]
        public string UserProfileId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
    }
}
