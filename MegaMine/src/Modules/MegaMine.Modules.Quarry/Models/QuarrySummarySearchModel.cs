//-------------------------------------------------------------------------------------------------
// <copyright file="QuarrySummarySearchModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Used to pass the search parameters from UI
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Models
{
    using System;

    public class QuarrySummarySearchModel
    {
        public int QuarryId { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}
