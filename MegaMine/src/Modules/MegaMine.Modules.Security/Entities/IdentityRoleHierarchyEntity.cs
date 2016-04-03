using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Modules.Security.Entities
{
    [Table("IdentityRoleHierarchy")]
    public class IdentityRoleHierarchyEntity
    {
        public string RoleId { get; set; }
        public string ChildRoleId { get; set; }
    }
}
