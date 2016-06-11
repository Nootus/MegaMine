using System.ComponentModel.DataAnnotations;

namespace MegaMine.Modules.Quarry.Entities
{
    public class ProductSummaryEntity
    {
        [Key]
        public string Id { get; set; }
        public int ProductTypeId { get; set; }
        public string ProductTypeName { get; set; }
        public int QuarryId { get; set; }
        public string QuarryName { get; set; }
        public int MaterialColourId { get; set; }
        public string ColourName { get; set; }
        public int MaterialCount { get; set; }
    }
}
