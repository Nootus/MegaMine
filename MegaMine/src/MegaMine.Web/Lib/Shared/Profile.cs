using MegaMine.Common.Context;
using MegaMine.Web.Lib.Middleware;
using MegaMine.Web.Lib.Repositories;
using MegaMine.Web.Models.Account;
using MegaMine.Web.Models.Shared;
using Microsoft.AspNet.Http;
using System;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace MegaMine.Web.Lib.Shared
{
    public static class Profile
    {
        public static async Task<ProfileModel> Get(string userName, AccountRepository accountRepository)
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
