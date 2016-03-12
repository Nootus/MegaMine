using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Core.Models
{
    public interface ITimeRange
    {
        DateTime StartTime { get; set; }
        DateTime EndTime { get; set; }
    }
}
