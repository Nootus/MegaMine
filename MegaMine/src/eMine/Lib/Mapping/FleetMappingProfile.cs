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
            Mapper.CreateMap<VehicleTypeModel, VehicleTypeEntity>();

            Mapper.CreateMap<VehicleServiceModel, VehicleServiceEntity>()
                .ForMember(dest => dest.ServiceStartDate, opt => opt.MapFrom(origin => origin.ServiceDate))
                .ForMember(dest => dest.ServiceDeliveryDate, opt => opt.MapFrom(origin => origin.ServiceDate));

            Mapper.CreateMap<VehicleTripEntity, VehicleTripModel>();
            Mapper.CreateMap<VehicleTripModel, VehicleTripEntity>();

            Mapper.CreateMap<VehicleDriverEntity, VehicleDriverModel>();
            Mapper.CreateMap<VehicleDriverModel, VehicleDriverEntity>();

            Mapper.CreateMap<VehicleModelEntity, VehicleManufactureModelModel>();
            Mapper.CreateMap<VehicleManufactureModelModel, VehicleModelEntity>();

            Mapper.CreateMap<VehicleFuelEntity, FuelModel>();
            Mapper.CreateMap<FuelModel, VehicleFuelEntity>();

            Mapper.CreateMap<VehicleDriverAssignmentEntity, VehicleDriverAssignmentModel>();
            Mapper.CreateMap<VehicleDriverAssignmentModel, VehicleDriverAssignmentEntity>();
        }
    }
}
