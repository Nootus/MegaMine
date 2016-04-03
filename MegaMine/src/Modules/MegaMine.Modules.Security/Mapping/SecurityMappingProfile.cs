﻿using AutoMapper;
using MegaMine.Modules.Security.Entities;
using MegaMine.Modules.Security.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MegaMine.Modules.Security.Mapping
{
    public class SecurityMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "SecurityMappingProfile"; }
        }

        protected override void Configure()
        {
            Mapper.CreateMap<CompanyEntity, CompanyModel>();
            Mapper.CreateMap<IdentityMenuPageEntity, MenuModel>();
            Mapper.CreateMap<IdentityRoleClaim<string>, ClaimModel>();
            Mapper.CreateMap<IdentityUserClaim<string>, ClaimModel>();
            Mapper.CreateMap<ApplicationRole, RoleModel>(MemberList.Destination);
                
        }
    }
}