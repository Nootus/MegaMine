using System.Collections.Generic;

namespace MegaMine.Modules.Quarry.Models
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
