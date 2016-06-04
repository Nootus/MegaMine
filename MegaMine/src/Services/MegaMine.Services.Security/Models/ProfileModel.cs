using System.Collections.Generic;

namespace MegaMine.Services.Security.Models
{
    public class ProfileModel
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string FullName { get { return FirstName + " " + LastName; } }
        public int CompanyId { get; set; }

        public string[] AdminRoles { get; set; }
        public List<ClaimModel> Claims { get; set; }
        public List<CompanyModel> Companies { get; set; }

        public List<MenuModel> Menu { get; set; }
    }
}
