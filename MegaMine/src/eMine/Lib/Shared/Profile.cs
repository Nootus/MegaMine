using eMine.Lib.Middleware;
using eMine.Lib.Repositories;
using eMine.Models.Account;
using eMine.Models.Shared;
using Microsoft.AspNet.Http;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eMine.Lib.Shared
{
    public static class Profile
    {
        public static async Task<ProfileModel> Get(string userName, AccountRepository accountRepository)
        {
            ProfileModel profile = await accountRepository.UserProfileGet(userName);
            //setting all the roles for admin roles
            if(profile.AdminRoles.Length > 0)
            {
                profile.AdminRoles = PageService.AdminRoles.Where(r => profile.AdminRoles.Contains(r.Key)).Select(r => r.Item).ToArray();
            }
            profile.SetMenu();

            //setting the claims on to the context
            Profile.SetCurrent(profile);

            return profile;
        }

        public static void Set(HttpContext context)
        {
            var claims = context.User.Claims;

            string companyId = context.Request.Headers[Constants.HeaderCompanyId];
            companyId = companyId ?? context.User.Claims.Where(c => c.Type == NTClaimTypes.CompanyId).Select(c => c.Value).FirstOrDefault();

            ProfileModel profile = new ProfileModel()
            {
                UserId = claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value,
                UserName = context.User.Identity.Name,
                FirstName = claims.First(c => c.Type == NTClaimTypes.FirstName).Value,
                LastName = claims.First(c => c.Type == NTClaimTypes.LastName).Value,
                CompanyId = Convert.ToInt32(companyId ?? "0")
            };
            Profile.SetCurrent(profile);
        }

        public static ProfileModel Current
        {
            get
            {
                return (ProfileModel)HttpHelper.HttpContext?.Items[Constants.ProfileString];
            }
        }

        private static void SetCurrent(ProfileModel profile)
        {
            HttpHelper.HttpContext.Items[Constants.ProfileString] = profile;
        }

    }
}
