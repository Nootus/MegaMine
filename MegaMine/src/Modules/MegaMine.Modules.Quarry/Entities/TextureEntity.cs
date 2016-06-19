using MegaMine.Core.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Quarry.Entities
{
    [Table("Texture", Schema = "quarry")]
    public class TextureEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TextureId { get; set; }
        public string TextureName { get; set; }
    }
}
