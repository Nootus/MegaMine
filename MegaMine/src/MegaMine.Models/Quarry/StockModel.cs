using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Models.Quarry
{
    public class StockModel : MaterialModel
    {
        public int MaterialMovementId { get; set; }
        public string ProductType { get; set; }
        public string MaterialColour { get; set; }
        public string Quarry { get; set; }
    }
}
