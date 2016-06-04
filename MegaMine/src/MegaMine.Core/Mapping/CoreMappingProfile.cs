using AutoMapper;
using MegaMine.Core.Context;

namespace MegaMine.Core.Mapping
{
    public class CoreMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "SecurityMappingProfile"; }
        }
        protected override void Configure()
        {
            Mapper.CreateMap<NTContextModel, NTContextModel>();
        }
    }
}
