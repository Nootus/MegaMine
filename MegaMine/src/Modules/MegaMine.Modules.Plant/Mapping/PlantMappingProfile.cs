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
        public PlantMappingProfile()
        {
            this.CreateMap<MachineEntity, MachineModel>().ReverseMap();
            this.CreateMap<BladeEntity, BladeModel>().ReverseMap();
            this.CreateMap<OperatorEntity, OperatorModel>().ReverseMap();
        }

        public override string ProfileName
        {
            get
            {
                return "PlantMappingProfile";
            }
        }
    }
}
