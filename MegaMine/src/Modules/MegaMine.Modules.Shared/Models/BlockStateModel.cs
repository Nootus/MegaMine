//-------------------------------------------------------------------------------------------------
// <copyright file="BlockStateModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Model for storing the state of the block
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Shared.Models
{
    public class BlockStateModel
    {
        public int BlockId { get; set; }

        public string BlockNumber { get; set; }

        public int State { get; set; }
    }
}
