using AutoMapper;
using MegaMine.Core.Models.Widgets;
using MegaMine.Modules.Quarry.Entities.Widget;
using System.Collections.Generic;

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
            Mapper.CreateMap<QuarryMaterialCountEntity, ChartXYModel>(MemberList.Destination)
                .ForMember(dest => dest.X, opts => opts.MapFrom(src => src.QuarryName))
                .ForMember(dest => dest.Y, opts => opts.MapFrom(src => src.MaterialCount));

        }
    }
}
