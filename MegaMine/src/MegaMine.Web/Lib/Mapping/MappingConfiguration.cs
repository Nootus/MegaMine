using AutoMapper;
using MegaMine.Modules.Quarry.Mapping;

namespace MegaMine.Web.Lib.Mapping
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
