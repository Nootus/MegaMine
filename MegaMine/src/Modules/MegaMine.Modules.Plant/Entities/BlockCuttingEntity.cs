using MegaMine.Core.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Modules.Plant.Entities
{
    [Table("BlockCutting", Schema = "plant")]
    public class BlockCuttingEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BlockDressingId { get; set; }
        public int CuttingId { get; set; }
        public int BlockId { get; set; }
        public string BlockNumber { get; set; }
        public decimal Length { get; set; }
        public decimal Width { get; set; }
        public decimal Height { get; set; }
        public int SlabCount { get; set; }
    }
}
