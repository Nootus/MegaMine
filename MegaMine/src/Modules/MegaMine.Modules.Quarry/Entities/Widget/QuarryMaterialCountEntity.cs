using System.ComponentModel.DataAnnotations;

namespace MegaMine.Modules.Quarry.Entities.Widget
{
    public class QuarryMaterialCountEntity
    {
        [Key]
        public int QuarryId { get; set; }
        public string QuarryName { get; set; }
        public int MaterialCount { get; set; }
    }
}
