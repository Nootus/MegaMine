using MegaMine.Core.Models;
using System.Collections.Generic;

namespace MegaMine.Modules.Quarry.Models
{
    public class MaterialViewModel
    {
        public List<ProductTypeModel> ProductTypes { get; set; }
        public List<ListItem<int, string>> MaterialColours { get; set; }
        public List<ListItem<int, string>> Quarries { get; set; }
        public List<ListItem<int, string>> Textures { get; set; }
        public List<ListItem<int, string>> ProcessTypes { get; set; }

        public MaterialModel Model { get; set; }
    }
}
