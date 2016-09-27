//-------------------------------------------------------------------------------------------------
// <copyright file="FleetMappingProfile.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Automapper mapping for Fleet Entities and DTOs
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Lib.Mapping
{
    using AutoMapper;
    using MegaMine.Web.Lib.Entities.Fleet;
    using MegaMine.Web.Models.Fleet;

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

            Mapper.CreateMap<VehicleManufacturerEntity, VehicleManufacturerModel>();
            Mapper.CreateMap<VehicleManufacturerModel, VehicleManufacturerEntity>();
            Mapper.CreateMap<VehicleManufacturerEntity, ManufacturerDetailsModel>();

            Mapper.CreateMap<VehicleEntity, VehicleModel>();
            Mapper.CreateMap<VehicleModel, VehicleEntity>();

            Mapper.CreateMap<VehicleServiceEntity, VehicleServiceModel>();
            Mapper.CreateMap<VehicleServiceModel, VehicleServiceEntity>();
        }
    }
}
