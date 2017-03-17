//-------------------------------------------------------------------------------------------------
// <copyright file="WidgetMappingProfile.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  AutoMapper mapping profile for models and entiries in the widget project
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Widget.Mapping
{
    using AutoMapper;
    using MegaMine.Core.Models.Widget;
    using MegaMine.Services.Widget.Entities;

    public class WidgetMappingProfile : Profile
    {
        public WidgetMappingProfile()
        {
            this.CreateMap<ChartTypeEntity, ChartModel>();
            this.CreateMap<WidgetEntity, WidgetModel>()
                .ForMember(dest => dest.WidgetId, opts => opts.MapFrom(src => src.WidgetId))
                .ForMember(dest => dest.Name, opts => opts.MapFrom(src => src.Name))
                .ForMember(dest => dest.Claim, opts => opts.MapFrom(src => src.Claim))
                .ForMember(dest => dest.SizeX, opts => opts.MapFrom(src => src.SizeX))
                .ForMember(dest => dest.SizeY, opts => opts.MapFrom(src => src.SizeY))
                .ForMember(dest => dest.Chart, opts => opts.MapFrom(src => Mapper.Map<ChartTypeEntity, ChartModel>(src.Chart)));
            this.CreateMap<DashboardPageWidgetEntity, PageWidgetModel>(MemberList.Destination)
                .ForMember(dest => dest.DashboardPageWidgetId, opts => opts.MapFrom(src => src.DashboardPageWidgetId))
                .ForMember(dest => dest.WidgetId, opts => opts.MapFrom(src => src.WidgetId))
                .ForMember(dest => dest.WidgetOptions, opts => opts.MapFrom(src => src));
            this.CreateMap<DashboardPageWidgetEntity, WidgetOptionsModel>()
                .ForMember(dest => dest.Columns, opts => opts.MapFrom(src => src.Columns))
                .ForMember(dest => dest.Rows, opts => opts.MapFrom(src => src.Rows))
                .ForMember(dest => dest.SizeX, opts => opts.MapFrom(src => src.SizeX))
                .ForMember(dest => dest.SizeY, opts => opts.MapFrom(src => src.SizeY));
        }

        public override string ProfileName
        {
            get { return "WidgetMappingProfile"; }
        }
    }
}
