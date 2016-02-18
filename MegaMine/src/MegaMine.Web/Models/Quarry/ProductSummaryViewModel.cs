using eMine.Lib.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Quarry
{
    public class ProductSummaryViewModel
    {
        public List<ListItem<int, string>> Quarries { get; set; }
        public List<ListItem<int, string>> ProductTypes { get; set; }
        public List<ProductSummaryModel> Summary { get; set; }
    }
}
