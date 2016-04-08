using MegaMine.Core.Context;
using MegaMine.Core.Exception;
using MegaMine.Services.Security.Common;
using MegaMine.Services.Security.Entities;
using MegaMine.Services.Security.Identity;
using MegaMine.Services.Security.Models;
using MegaMine.Services.Security.Repositories;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;

namespace MegaMine.Services.Security.Domain
{
    public class AccountDomain
    {
        private UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;
        private SecurityRepository accountRepository;


        public AccountDomain(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, SecurityRepository accountRepository)
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
                throw new NTException(SecurityMessages.InvalidUsernamePassword);
            }

            var profile = await Profile.Get(userName, accountRepository);

            return profile;
        }

        public async Task<ProfileModel> ProfileGet()
        {
            var profile = await Profile.Get(NTContext.Context.UserName, accountRepository);

            return profile;
        }

        public async Task Logout()
        {
            await signInManager.SignOutAsync();
        }

        public async Task ChangePassword(ChangePasswordModel model)
        {
            ApplicationUser user = await userManager.FindByIdAsync(NTContext.Context.UserId);
            IdentityResult result = await userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                throw new NTException(SecurityMessages.ChangePasswordError, result.Errors);
            }
        }

        public async Task<int[]> GetGroupCompanyIds()
        {
            return await accountRepository.GetGroupCompanyIds();
        }
    }
}
