using eMine.Lib.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Quarry
{
    public class MaterialViewModel
    {
        public List<ListItem<int, string>> ProductType { get; set; }
        public List<ListItem<int, string>> MaterialColour { get; set; }
        public List<ListItem<int, string>> Quarry { get; set; }

        public MaterialModel Model { get; set; }
    }
}
