﻿using System;

namespace MegaMine.Core.Models
{
    public interface ITimeRange
    {
        DateTime StartTime { get; set; }
        DateTime EndTime { get; set; }
    }
}
