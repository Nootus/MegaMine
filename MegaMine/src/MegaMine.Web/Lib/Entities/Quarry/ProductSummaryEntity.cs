using System.ComponentModel.DataAnnotations;

namespace MegaMine.Web.Lib.Entities.Quarry
{
    public class ProductSummaryEntity
    {
        [Key]
        public long RowId { get; set; }
        public int ProductTypeId { get; set; }
        public string ProductTypeName { get; set; }
        public int QuarryId { get; set; }
        public string QuarryName { get; set; }
        public int MaterialCount { get; set; }
    }
}
