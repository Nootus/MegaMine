//-------------------------------------------------------------------------------------------------
// <copyright file="MaterialEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Object for storing extracted materials
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using MegaMine.Core.Entities;

    [Table("Material", Schema = "quarry")]
    public class MaterialEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
