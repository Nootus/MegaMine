using AutoMapper;

namespace MegaMine.Modules.Shared.Mapping
{
    public class SharedMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "QuarryMappingProfile"; }
        }
        protected override void Configure()
        {
        }
    }
}
