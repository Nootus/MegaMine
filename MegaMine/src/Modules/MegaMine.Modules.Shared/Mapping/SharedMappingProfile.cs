//-------------------------------------------------------------------------------------------------
// <copyright file="SharedMappingProfile.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Automapper mapping for the shared functionality
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Shared.Mapping
{
    using AutoMapper;

    public class SharedMappingProfile : Profile
    {
        public override string ProfileName
        {
            get
            {
                return "QuarryMappingProfile";
            }
        }

        protected override void Configure()
        {
        }
    }
}
