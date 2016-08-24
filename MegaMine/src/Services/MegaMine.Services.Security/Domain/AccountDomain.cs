//-------------------------------------------------------------------------------------------------
// <copyright file="AccountDomain.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Domain class for all security related business logic
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Security.Domain
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MegaMine.Core.Context;
    using MegaMine.Core.Exception;
    using MegaMine.Services.Security.Common;
    using MegaMine.Services.Security.Entities;
    using MegaMine.Services.Security.Identity;
    using MegaMine.Services.Security.Models;
    using MegaMine.Services.Security.Repositories;
    using Microsoft.AspNetCore.Identity;

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
            var result = await this.signInManager.PasswordSignInAsync(userName, password, false, false);

            if (!result.Succeeded)
            {
                throw new NTException(SecurityMessages.InvalidUsernamePassword);
            }

            var profile = await Profile.Get(userName, this.accountRepository);

            return profile;
        }

        public async Task<ProfileModel> ProfileGet()
        {
            var profile = await Profile.Get(NTContext.Context.UserName, this.accountRepository);

            return profile;
        }

        public async Task Logout()
        {
            await this.signInManager.SignOutAsync();
        }

        public async Task ChangePassword(ChangePasswordModel model)
        {
            ApplicationUser user = await this.userManager.FindByIdAsync(NTContext.Context.UserId);
            IdentityResult result = await this.userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                throw new NTException(SecurityMessages.ChangePasswordError, AutoMapper.Mapper.Map<List<NTError>>(result.Errors));
            }
        }

        public async Task<int[]> GetGroupCompanyIds()
        {
            return await this.accountRepository.GetGroupCompanyIds();
        }
    }
}
