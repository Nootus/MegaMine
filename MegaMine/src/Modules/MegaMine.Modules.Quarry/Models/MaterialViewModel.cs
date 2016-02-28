using MegaMine.Core.Models;
using System.Collections.Generic;

namespace MegaMine.Modules.Quarry.Models
{
    public class MaterialViewModel
    {
        public List<ProductTypeModel> ProductType { get; set; }
        public List<ListItem<int, string>> MaterialColour { get; set; }
        public List<ListItem<int, string>> Quarry { get; set; }

        public MaterialModel Model { get; set; }
    }
}
