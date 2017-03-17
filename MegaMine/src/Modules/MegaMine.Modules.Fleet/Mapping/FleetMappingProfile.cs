//-------------------------------------------------------------------------------------------------
// <copyright file="FleetMappingProfile.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Automapper mapping for Fleet Entities and DTOs
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Mapping
{
    using AutoMapper;
    using MegaMine.Modules.Fleet.Entities;
    using MegaMine.Modules.Fleet.Models;

    public class FleetMappingProfile : Profile
    {
        public FleetMappingProfile()
        {
            this.CreateMap<VehicleTypeEntity, VehicleTypeModel>().ReverseMap();
            this.CreateMap<VehicleTripEntity, VehicleTripModel>().ReverseMap();
            this.CreateMap<VehicleDriverEntity, VehicleDriverModel>().ReverseMap();
            this.CreateMap<VehicleModelEntity, VehicleManufacturerModelModel>().ReverseMap();
            this.CreateMap<VehicleFuelEntity, FuelModel>().ReverseMap();
            this.CreateMap<VehicleDriverAssignmentEntity, VehicleDriverAssignmentModel>().ReverseMap();
            this.CreateMap<VehicleManufacturerEntity, VehicleManufacturerModel>().ReverseMap();
            this.CreateMap<VehicleManufacturerEntity, ManufacturerDetailsModel>().ReverseMap();
            this.CreateMap<VehicleEntity, VehicleModel>()
                .ForMember(dest => dest.VehicleType, opt => opt.Ignore())
                .ForMember(dest => dest.Ownership, opt => opt.Ignore())
                .ReverseMap()
                .ForMember(dest => dest.VehicleType, opt => opt.Ignore());
            this.CreateMap<VehicleServiceEntity, VehicleServiceModel>()
                .ForMember(dest => dest.ServiceDate, opt => opt.MapFrom(src => src.ServiceStartDate))
                .ReverseMap()
                .ForMember(dest => dest.ServiceStartDate, opt => opt.MapFrom(src => src.ServiceDate));
        }

        public override string ProfileName
        {
            get
            {
                return "FleetMappingProfile";
            }
        }
    }
}
