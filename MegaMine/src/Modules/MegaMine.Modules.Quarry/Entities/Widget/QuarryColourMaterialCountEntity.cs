using System.ComponentModel.DataAnnotations;

namespace MegaMine.Modules.Quarry.Entities.Widget
{
    public class QuarryColourMaterialCountEntity
    {
        [Key]
        public string QuarryColourId { get; set; }
        public int QuarryId { get; set; }
        public string QuarryName { get; set; }
        public int MaterialColourId { get; set; }
        public string ColourName { get; set; }
        public int MaterialCount { get; set; }
    }
}
