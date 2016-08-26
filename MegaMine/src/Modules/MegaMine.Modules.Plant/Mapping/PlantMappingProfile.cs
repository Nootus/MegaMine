//-------------------------------------------------------------------------------------------------
// <copyright file="PlantMappingProfile.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Automapper profile for plant module
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Mapping
{
    using AutoMapper;
    using MegaMine.Modules.Plant.Entities;
    using MegaMine.Modules.Plant.Models;

    public class PlantMappingProfile : Profile
    {
        public override string ProfileName
        {
            get
            {
                return "PlantMappingProfile";
            }
        }

        protected override void Configure()
        {
            Mapper.CreateMap<MachineEntity, MachineModel>().ReverseMap();
            Mapper.CreateMap<BladeEntity, BladeModel>().ReverseMap();
            Mapper.CreateMap<OperatorEntity, OperatorModel>().ReverseMap();
        }
    }
}
