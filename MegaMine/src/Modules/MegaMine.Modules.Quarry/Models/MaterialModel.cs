//-------------------------------------------------------------------------------------------------
// <copyright file="MaterialModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DTO for Material data
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Models
{
    using System;

    public class MaterialModel
    {
        public int MaterialId { get; set; }

        public string BlockNumber { get; set; }

        public int QuarryId { get; set; }

        public int YardId { get; set; }

        public int MaterialColourId { get; set; }

        public int ProductTypeId { get; set; }

        public int ProcessTypeId { get; set; }

        public int? TextureId { get; set; }

        public string Dimensions { get; set; }

        public decimal? Length { get; set; }

        public decimal? Width { get; set; }

        public decimal? Height { get; set; }

        public decimal? Weight { get; set; }

        public DateTime MaterialDate { get; set; }
    }
}
