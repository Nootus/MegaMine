using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Quarry
{
    public class StockModel
    {
        public int MaterialMovementId { get; set; }
        public string ProductType { get; set; }
        public string MaterialColour { get; set; }
        public string Dimensions { get; set; }
        public string Quarry { get; set; }
        public DateTime MaterialDate { get; set; }

        public int ProductTypeId { get; set; }
        public int MaterialColourId { get; set; }
        public int QuarryId { get; set; }
    }
}
