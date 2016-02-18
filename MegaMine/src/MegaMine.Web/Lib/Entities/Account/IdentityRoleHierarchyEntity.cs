using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eMine.Lib.Entities.Account
{
    [Table("IdentityRoleHierarchy")]
    public class IdentityRoleHierarchyEntity
    {
        public string RoleId { get; set; }
        public string ChildRoleId { get; set; }
    }
}
