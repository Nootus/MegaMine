using AutoMapper;

namespace eMine.Lib.Mapping
{
    public class MappingConfiguration
    {
        public static void Configure()
        {
            Mapper.Initialize(x =>
            {
                x.AddProfile<FleetMappingProfile>();
                x.AddProfile<QuarryMappingProfile>();
                x.AddProfile<AccountMappingProfile>();
            });
        }
    }
}
