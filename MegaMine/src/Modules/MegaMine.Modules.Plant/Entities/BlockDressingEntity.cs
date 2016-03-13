using MegaMine.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Modules.Plant.Entities
{
    [Table("BlockDressing", Schema = "plant")]
    public class BlockDressingEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BlockDressingId { get; set; }
        public int DressingId { get; set; }
        public int BlockId { get; set; }
        public string BlockNumber { get; set; }
        public decimal LengthBefore { get; set; }
        public decimal WidthBefore { get; set; }
        public decimal HeightBefore { get; set; }
        public decimal? WeightBefore { get; set; }
        public decimal Length { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public decimal? Weight { get; set; }

        [ForeignKey("DressingId")]
        public DressingEntity Dressing { get; set; }
    }
}
