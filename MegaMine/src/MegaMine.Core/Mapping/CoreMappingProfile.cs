using AutoMapper;
using MegaMine.Core.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Core.Mapping
{
    public class CoreMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "SecurityMappingProfile"; }
        }
        protected override void Configure()
        {
            Mapper.CreateMap<NTContextModel, NTContextModel>();
        }
    }
}
