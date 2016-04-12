using System.ComponentModel.DataAnnotations;

namespace MegaMine.Modules.Quarry.Entities.Widget
{
    public class QuarryMaterialCountEntity
    {
        [Key]
        public long Seq { get; set; }
        public string QuarryName { get; set; }
        public int MaterialCount { get; set; }
    }
}
