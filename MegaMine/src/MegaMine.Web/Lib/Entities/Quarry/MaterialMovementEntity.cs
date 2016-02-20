using MegaMine.Core.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MegaMine.Web.Lib.Entities.Quarry
{
    [Table("MaterialMovement")]
    public class MaterialMovementEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MaterialMovementId { get; set; }
        public int MaterialId { get; set; }
        public int FromYardId { get; set; }
        public int ToYardId { get; set; }
        public DateTime MovementDate { get; set; }
        public bool CurrentInd { get; set; }

        public MaterialEntity Material { get; set; }
    }
}
