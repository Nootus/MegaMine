//-------------------------------------------------------------------------------------------------
// <copyright file="SparePartOrderModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Sparepart Order DTO
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Models.Fleet
{
    using System;

    public class SparePartOrderModel
    {
        public int SparePartOrderId { get; set; }

        public int SparePartId { get; set; }

        public int OrderedUnits { get; set; }

        public decimal UnitCost { get; set; }

        public DateTime? OrderedUTCdatetime { get; set; }

        public DateTime? DeliveredUTCdatetime { get; set; }

        public string FollowupEmailAddress { get; set; }

        public string FollowupPhoneNum { get; set; }

        public int ConsumedUnits { get; set; }
    }
}
