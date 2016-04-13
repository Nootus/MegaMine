using System.ComponentModel.DataAnnotations;

namespace MegaMine.Modules.Quarry.Entities.Widget
{
    public class QuarryProductTypeMaterialCountEntity
    {
        [Key]
        public int QuarrId { get; set; }
        public string QuarryName { get; set; }
        public int ProductTypeId { get; set; }
        public string ProductTypeName { get; set; }
        public int MaterialCount { get; set; }
    }
}
