using AutoMapper;
using eMine.Lib.Entities.Account;
using eMine.Lib.Entities.Administration;
using eMine.Models.Account;
using eMine.Models.Administration;
using Microsoft.AspNet.Identity.EntityFramework;

namespace eMine.Lib.Mapping
{
    public class AccountMappingProfile : Profile
    {
        public override string ProfileName
        {
            get { return "AccountMappingProfile"; }
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
