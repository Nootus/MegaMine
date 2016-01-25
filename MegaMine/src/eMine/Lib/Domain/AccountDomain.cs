using eMine.Lib.Entities.Account;
using eMine.Lib.Middleware;
using eMine.Lib.Repositories;
using eMine.Lib.Shared;
using eMine.Models;
using eMine.Models.Account;
using eMine.Models.Shared;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eMine.Lib.Domain
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
            //await userManager.CreateAsync(new ApplicationUser() { UserName = "megamine@nootus.com" }, "Nootus@123");

            var result = await signInManager.PasswordSignInAsync(userName, password, false, false);

            if (!result.Succeeded)
            {
                throw new NTException(Messages.Account.InvalidUsernamePassword);
            }

            return Profile.Current;
        }

        public async Task<ProfileModel> DefaultProfile()
        {
            var profile = await Profile.Get(Profile.Current.UserName, accountRepository);

            return profile;
        }

        public async Task Logout()
        {
            await signInManager.SignOutAsync();
        }

        public async Task ChangePassword(ChangePasswordModel model)
        {
            ApplicationUser user = await userManager.FindByIdAsync(profile.UserID);
            IdentityResult result = await userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                throw new NTException(Messages.Account.ChangePasswordError, result.Errors);
            }
        }
    }
}
