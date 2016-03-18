using AutoMapper;
using MegaMine.Modules.Plant.Entities;
using MegaMine.Modules.Plant.Models;

namespace MegaMine.Modules.Plant.Mapping
{
    public class PlantMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "PlantMappingProfile"; }
        }

        protected override void Configure()
        {
            Mapper.CreateMap<MachineEntity, MachineModel>().ReverseMap();
            Mapper.CreateMap<BladeEntity, BladeModel>().ReverseMap();
            Mapper.CreateMap<OperatorEntity, OperatorModel>().ReverseMap();
        }
    }
}
