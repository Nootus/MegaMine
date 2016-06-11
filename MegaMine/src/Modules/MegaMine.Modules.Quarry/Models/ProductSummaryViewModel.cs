using MegaMine.Core.Models;
using System.Collections.Generic;

namespace MegaMine.Modules.Quarry.Models
{
    public class ProductSummaryViewModel
    {
        public List<ListItem<int, string>> Quarries { get; set; }
        public List<ListItem<int, string>> ProductTypes { get; set; }
        public List<ListItem<int, string>> Colours { get; set; }
        public List<ProductSummaryModel> Summary { get; set; }
    }
}
