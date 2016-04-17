using AutoMapper;
using MegaMine.Core.Widgets;
using MegaMine.Modules.Quarry.Entities.Widget;

namespace MegaMine.Modules.Quarry.Mapping
{
    public class WidgetMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "QuarryWidgetMappingProfile"; }
        }

        protected override void Configure()
        {
            //Quarry Materal Blocks
            Mapper.CreateMap<QuarryMaterialCountEntity, ChartPointModel<string, int>>(MemberList.Destination)
                .ForMember(dest => dest.X, opts => opts.MapFrom(src => src.QuarryName))
                .ForMember(dest => dest.Y, opts => opts.MapFrom(src => src.MaterialCount));

        }
    }
}
