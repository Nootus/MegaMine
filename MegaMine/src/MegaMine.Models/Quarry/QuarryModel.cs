using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Models.Quarry
{
    public class QuarryModel
    {
        public int QuarryId { get; set; }
        public string QuarryName { get; set; }
        public string Location { get; set; }
        public List<int> ColourIds { get; set; }
        public string Colours { get; set; }
    }
}
