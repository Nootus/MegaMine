using eMine.Lib.Entities.Account;
using eMine.Lib.Middleware;
using eMine.Lib.Repositories;
using eMine.Lib.Shared;
using eMine.Models;
using eMine.Models.Account;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eMine.Lib.Domain
{
    public class AccountDomain
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
            ProfileModel profile = null;

            //await userManager.CreateAsync(new ApplicationUser() { UserName = "megamine@nootus.com" }, "Nootus@123");

            var result = await signInManager.PasswordSignInAsync(userName, password, false, false);

            if (result.Succeeded)
            {
                profile = await ProfileGet(userName);
            }
            else
            {
                throw new eMineException("Invalid Username and/or Password");
            }

            return profile;
        }

        internal async Task<ProfileModel> ProfileGet(string userName)
        {
            ProfileModel profile = await accountRepository.UserProfileGet(userName);
            //setting all the roles
            profile.Roles = PageService.Roles.Where(r => profile.Roles.Contains(r.Key)).Select(r => r.Item).ToArray();
            profile.SetMenu();

            //setting the claims on to the context'
            Profile.SetCurrent(profile);

            return profile;
        }

        public async Task<ProfileModel> DefaultProfile()
        {
            var profile = Profile.Current;

            profile = await ProfileGet(profile.UserName);

            return profile;
        }

        public string Logout()
        {
            signInManager.SignOut();
            return null;
        }
    }
}
