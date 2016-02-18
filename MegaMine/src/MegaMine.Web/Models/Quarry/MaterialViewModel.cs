using MegaMine.Web.Lib.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Models.Quarry
{
    public class MaterialViewModel
    {
        public List<ProductTypeModel> ProductType { get; set; }
        public List<ListItem<int, string>> MaterialColour { get; set; }
        public List<ListItem<int, string>> Quarry { get; set; }

        public MaterialModel Model { get; set; }
    }
}
