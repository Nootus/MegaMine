using AutoMapper;

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
            //Mapper.CreateMap<WidgetEntity, WidgetModel>().ReverseMap();
        }
    }
}
