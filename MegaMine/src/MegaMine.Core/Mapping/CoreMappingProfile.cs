//-------------------------------------------------------------------------------------------------
// <copyright file="CoreMappingProfile.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Specifying the AutoMapepr Mapping details
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Core.Mapping
{
    using AutoMapper;
    using MegaMine.Core.Context;

    public class CoreMappingProfile : Profile
    {
        public override string ProfileName
        {
            get
            {
                return "SecurityMappingProfile";
            }
        }

        protected override void Configure()
        {
            Mapper.CreateMap<NTContextModel, NTContextModel>();
        }
    }
}
