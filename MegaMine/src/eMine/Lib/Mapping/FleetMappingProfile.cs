using AutoMapper;
using eMine.Lib.Entities.Fleet;
using eMine.Models.Fleet;

namespace eMine.Lib.Mapping
{
    public class FleetMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "FleetMappingProfile"; }
        }

        protected override void Configure()
        {
            Mapper.CreateMap<VehicleTypeEntity, VehicleTypeModel>();
            Mapper.CreateMap<VehicleServiceViewModel, VehicleServiceEntity>()
                .ForMember(dest => dest.ServiceStartDate, opt => opt.MapFrom(origin => origin.ServiceDate))
                .ForMember(dest => dest.ServiceDeliveryDate, opt => opt.MapFrom(origin => origin.ServiceDate))
                ;
        }
    }
}
