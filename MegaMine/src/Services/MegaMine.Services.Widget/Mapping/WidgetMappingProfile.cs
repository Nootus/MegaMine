using AutoMapper;
using MegaMine.Services.Widget.Entities;
using MegaMine.Services.Widget.Models;
using System.Collections.Generic;

namespace MegaMine.Services.Widget.Mapping
{
    public class WidgetMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "WidgetMappingProfile"; }
        }

        protected override void Configure()
        {
            Mapper.CreateMap<WidgetEntity, WidgetModel>();
            //.ForMember(model => model.Chart, opt => opt.MapFrom(src => src.Chart));
            Mapper.CreateMap<ChartTypeEntity, ChartTypeModel>();
        }
    }
}
