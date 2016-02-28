using AutoMapper;
using MegaMine.Modules.Quarry.Models;
using MegaMine.Modules.Quarry.Entities;

namespace MegaMine.Modules.Quarry.Mapping
{
    public class QuarryMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "QuarryMappingProfile"; }
        }

        protected override void Configure()
        {
            Mapper.CreateMap<MaterialColourEntity, MaterialColourModel>().ReverseMap();
            Mapper.CreateMap<ProductTypeEntity, ProductTypeModel>().ReverseMap();
            Mapper.CreateMap<QuarryEntity, QuarryModel>().ReverseMap();
            Mapper.CreateMap<YardEntity, YardModel>().ReverseMap();
            Mapper.CreateMap<MaterialEntity, MaterialModel>().ReverseMap();
            Mapper.CreateMap<ProductSummaryEntity, ProductSummaryModel>();
        }
    }
}
