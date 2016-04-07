using AutoMapper;
using MegaMine.Services.Security.Entities;
using MegaMine.Services.Security.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;

namespace MegaMine.Services.Security.Mapping
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
            Mapper.CreateMap<IdentityPageEntity, PageModel>(MemberList.Destination);
                //.ForSourceMember(source => source.Claims, opts => opts.Ignore())
                //.ForSourceMember(source => source.PageClaims, opts => opts.Ignore());

            Mapper.CreateMap<IdentityPageClaimEntity, PageClaimModel>();
            Mapper.CreateMap<IdentityMenuPageEntity, MenuModel>();
            Mapper.CreateMap<IdentityRoleClaim<string>, ClaimModel>();
            Mapper.CreateMap<IdentityUserClaim<string>, ClaimModel>();
            Mapper.CreateMap<ApplicationRole, RoleModel>(MemberList.Destination);
                
        }
    }
}
