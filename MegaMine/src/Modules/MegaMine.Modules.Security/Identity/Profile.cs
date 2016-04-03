using MegaMine.Core.Context;
using MegaMine.Modules.Security.Common;
using MegaMine.Modules.Security.Middleware;
using MegaMine.Modules.Security.Models;
using MegaMine.Modules.Security.Repositories;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Modules.Security.Identity
{
    public static class Profile
    {
        public static async Task<ProfileModel> Get(string userName, SecurityRepository accountRepository)
        {
            int? companyId = NTContext.Profile?.CompanyId;

            ProfileModel profile = await accountRepository.UserProfileGet(userName, companyId);
            //setting all the roles for admin roles
            if(profile.AdminRoles.Length > 0)
            {
                profile.AdminRoles = PageService.AdminRoles.Where(r => profile.AdminRoles.Contains(r.Key)).Select(r => r.Item).ToArray();
            }
            profile.SetMenu();

            //setting the claims on to the context
            NTContextProfileModel model = new NTContextProfileModel()
            {
                UserId = profile.UserId,
                UserName = profile.UserName,
                FirstName = profile.FirstName,
                LastName = profile.LastName,
                CompanyId = profile.CompanyId
            };
            NTContext.SetProfile(model);

            return profile;
        }



    }
}
