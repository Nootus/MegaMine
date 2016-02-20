using MegaMine.Core.Context;
using MegaMine.Web.Lib.Entities.Account;
using MegaMine.Web.Lib.Middleware;
using MegaMine.Web.Lib.Repositories;
using MegaMine.Web.Lib.Shared;
using MegaMine.Web.Models;
using MegaMine.Web.Models.Account;
using MegaMine.Web.Models.Shared;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MegaMine.Web.Lib.Domain
{
    public class AccountDomain : BaseDomain
    {
        private UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;
        private AccountRepository accountRepository;


        public AccountDomain(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, AccountRepository accountRepository)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.accountRepository = accountRepository;
        }

        public async Task<ProfileModel> Validate(string userName, string password)
        {
            var result = await signInManager.PasswordSignInAsync(userName, password, false, false);

            if (!result.Succeeded)
            {
                throw new NTException(Messages.Account.InvalidUsernamePassword);
            }

            var profile = await Profile.Get(userName, accountRepository);

            return profile;
        }

        public async Task<ProfileModel> ProfileGet()
        {
            var profile = await Profile.Get(NTContext.Profile.UserName, accountRepository);

            return profile;
        }

        public async Task Logout()
        {
            await signInManager.SignOutAsync();
        }

        public async Task ChangePassword(ChangePasswordModel model)
        {
            ApplicationUser user = await userManager.FindByIdAsync(NTContext.Profile.UserId);
            IdentityResult result = await userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                throw new NTException(Messages.Account.ChangePasswordError, result.Errors);
            }
        }
    }
}
