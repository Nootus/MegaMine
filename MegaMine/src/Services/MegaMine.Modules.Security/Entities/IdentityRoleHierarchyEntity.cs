using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Modules.Security.Entities
{
    [Table("IdentityRoleHierarchy", Schema = "security")]
    public class IdentityRoleHierarchyEntity
    {
        public string RoleId { get; set; }
        public string ChildRoleId { get; set; }
    }
}
