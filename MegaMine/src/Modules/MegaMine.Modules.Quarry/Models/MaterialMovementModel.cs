//-------------------------------------------------------------------------------------------------
// <copyright file="MaterialMovementModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Model to move material from one yard to another
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Models
{
    using System;

    public class MaterialMovementModel
    {
        public int[] MaterialIds { get; set; }

        public int FromYardId { get; set; }

        public int ToYardId { get; set; }

        public DateTime MovementDate { get; set; }
    }
}
