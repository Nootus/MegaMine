//-------------------------------------------------------------------------------------------------
// <copyright file="QuarryMappingProfile.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Automapper mapping definitions
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Mapping
{
    using AutoMapper;
    using MegaMine.Modules.Quarry.Entities;
    using MegaMine.Modules.Quarry.Models;

    public class QuarryMappingProfile : Profile
    {
        public QuarryMappingProfile()
        {
            this.CreateMap<MaterialColourEntity, MaterialColourModel>().ReverseMap();
            this.CreateMap<ProductTypeEntity, ProductTypeModel>().ReverseMap();
            this.CreateMap<TextureEntity, TextureModel>().ReverseMap();
            this.CreateMap<QuarryEntity, QuarryModel>().ReverseMap();
            this.CreateMap<YardEntity, YardModel>().ReverseMap();
            this.CreateMap<MaterialEntity, MaterialModel>().ReverseMap();
            this.CreateMap<ProductSummaryEntity, ProductSummaryModel>();
            this.CreateMap<StockEntity, StockModel>();
        }

        public override string ProfileName
        {
            get
            {
                return "QuarryMappingProfile";
            }
        }
    }
}
