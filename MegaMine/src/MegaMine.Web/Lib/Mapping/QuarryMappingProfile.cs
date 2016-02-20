using AutoMapper;
using MegaMine.Web.Lib.Entities.Quarry;
using MegaMine.Models.Quarry;

namespace MegaMine.Web.Lib.Mapping
{
    public class QuarryMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "QuarryMappingProfile"; }
        }

        protected override void Configure()
        {
            Mapper.CreateMap<MaterialColourEntity, MaterialColourModel>();
            Mapper.CreateMap<MaterialColourModel, MaterialColourEntity>();

            Mapper.CreateMap<ProductTypeEntity, ProductTypeModel>();
            Mapper.CreateMap<ProductTypeModel, ProductTypeEntity>();

            Mapper.CreateMap<QuarryEntity, QuarryModel>();
            Mapper.CreateMap<QuarryModel, QuarryEntity>();

            Mapper.CreateMap<YardEntity, YardModel>();
            Mapper.CreateMap<YardModel, YardEntity>();

            Mapper.CreateMap<MaterialEntity, MaterialModel>();
            Mapper.CreateMap<MaterialModel, MaterialEntity>();

            Mapper.CreateMap<ProductSummaryEntity, ProductSummaryModel>();
        }
    }
}
