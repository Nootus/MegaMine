using eMine.Lib.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Models.Quarry
{
    public class SummaryModel
    {
        [System.ComponentModel.DataAnnotations.Key]
        public string QuarryName { get; set; }
        public string Colours { get; set; }
        public int? Slab { get; set; }
        public int? Tile { get; set; }
        public int? Reject { get; set; }
        public int? Total { get; set; }
    }
}
