using AutoMapper;
using eMine.Lib.Entities.Fleet;
using eMine.Models.Fleet;

namespace eMine.Lib.Mapping
{
    public class FleetMappingProfile : AutoMapper.Profile
    {
        public override string ProfileName
        {
            get { return "FleetMappingProfile"; }
        }

        protected override void Configure()
        {
            Mapper.CreateMap<VehicleTypeEntity, VehicleTypeModel>();
        }
    }
}
