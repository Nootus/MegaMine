using AutoMapper;

namespace eMine.Lib.Mapping
{
    public class MappingConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(x => x.AddProfile<FleetMappingProfile>());
            Mapper.Initialize(x => x.AddProfile<QuarryMappingProfile>());
            Mapper.Initialize(x => x.AddProfile<AccountMappingProfile>());
        }
    }
}
