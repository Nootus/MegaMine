//-------------------------------------------------------------------------------------------------
// <copyright file="SparePartOrderEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Entity for SparePartOrder
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Lib.Entities.Fleet
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("SparePartOrder")]
    public class SparePartOrderEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
