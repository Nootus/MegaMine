using MegaMine.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Shared.Entities
{
    [Table("BlockState", Schema = "shared")]
    public class BlockStateEntity : BaseEntity
    {
        [Key]
        public int BlockId { get; set; }
        public string BlockNumber { get; set; }
        public int State { get; set; }
    }
}
