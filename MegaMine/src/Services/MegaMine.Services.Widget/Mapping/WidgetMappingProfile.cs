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
            Mapper.CreateMap<ChartTypeEntity, ChartModel>();
            Mapper.CreateMap<WidgetEntity, WidgetModel>()
                .ForMember(dest => dest.WidgetId, opts => opts.MapFrom(src => src.WidgetId))
                .ForMember(dest => dest.Name, opts => opts.MapFrom(src => src.Name))
                .ForMember(dest => dest.Claim, opts => opts.MapFrom(src => src.Claim))
                .ForMember(dest => dest.SizeX, opts => opts.MapFrom(src => src.SizeX))
                .ForMember(dest => dest.SizeY, opts => opts.MapFrom(src => src.SizeY))
                .ForMember(dest => dest.Chart, opts => opts.MapFrom(src => Mapper.Map<ChartTypeEntity, ChartModel>(src.Chart)));
            Mapper.CreateMap<DashboardPageWidgetEntity, PageWidgetModel>(MemberList.Destination)
                .ForMember(dest => dest.DashboardPageWidgetId, opts => opts.MapFrom(src => src.DashboardPageWidgetId))
                .ForMember(dest => dest.WidgetId, opts => opts.MapFrom(src => src.WidgetId))
                .ForMember(dest => dest.WidgetOptions, opts => opts.MapFrom(src => src));
            Mapper.CreateMap<DashboardPageWidgetEntity, WidgetOptionsModel>()
                .ForMember(dest => dest.Columns, opts => opts.MapFrom(src => src.Columns))
                .ForMember(dest => dest.Rows, opts => opts.MapFrom(src => src.Rows))
                .ForMember(dest => dest.SizeX, opts => opts.MapFrom(src => src.SizeX))
                .ForMember(dest => dest.SizeY, opts => opts.MapFrom(src => src.SizeY));
        }
    }
}
