using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Quarry.Entities
{
    public class StockEntity
    {
        [Key]
        public int MaterialId { get; set; }
        public string BlockNumber { get; set; }
        public int QuarryId { get; set; }
        public int YardId { get; set; }
        public int ProductTypeId { get; set; }
        public int ProcessTypeId { get; set; }
        public int MaterialColourId { get; set; }
        public int? TextureId { get; set; }
        public string Dimensions { get; set; }
        public decimal? Length { get; set; }
        public decimal? Width { get; set; }
        public decimal? Height { get; set; }
        public decimal? Weight { get; set; }
        public DateTime MaterialDate { get; set; }
        public string ProductType { get; set; }
        public string MaterialColour { get; set; }
        public string Texture { get; set; }
        public string Quarry { get; set; }
    }
}
