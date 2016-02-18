using AutoMapper;
using MegaMine.Web.Lib.Entities.Account;
using MegaMine.Web.Lib.Entities.Administration;
using MegaMine.Web.Models.Account;
using MegaMine.Web.Models.Administration;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MegaMine.Web.Lib.Mapping
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
