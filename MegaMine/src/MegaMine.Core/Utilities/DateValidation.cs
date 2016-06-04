using MegaMine.Core.Models;
using System.Collections.Generic;

namespace MegaMine.Core.Utilities
{
    public static class DateValidation
    {
        public static bool ValidateTimeRange(this ITimeRange range)
        {
            return range.StartTime < range.EndTime;
        }

        public static bool ValidateTimeRange<T>(this List<T> ranges) where T: ITimeRange
        {
            for (var counter = 0; counter < ranges.Count; counter++)
            {
                ITimeRange range = ranges[counter];
                if (!range.ValidateTimeRange())
                    return false;

                for (var subCounter = counter + 1; subCounter < ranges.Count; subCounter++)
                {
                    ITimeRange subRange = ranges[subCounter];

                    if ((subRange.StartTime <= range.StartTime & range.StartTime <= subRange.EndTime) || (subRange.StartTime < range.EndTime & range.EndTime <= subRange.EndTime) || (range.StartTime <= subRange.StartTime && range.EndTime >= subRange.EndTime))
                    {
                        return false;
                    }
                }
            }

            return true;
        }
    }
}
