using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Models.Quarry
{
    public class ProductTypeModel
    {
        public int ProductTypeId { get; set; }
        public string ProductTypeName { get; set; }
        public string ProductTypeDescription { get; set; }
        public string Formula { get; set; }
        public int? FormulaOrder { get; set; }
    }
}
