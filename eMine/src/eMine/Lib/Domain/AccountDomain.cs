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

            //await userManager.CreateAsync(user, "Prasanna@123");

            var result = await signInManager.PasswordSignInAsync(userName, password, false, false);

            if (result.Succeeded)
            {

                profile = await accountRepository.UserProfileGet(userName);
                profile.SetMenu();

                //setting the claims on to the context
                HttpHelper.HttpContext.Items["Profile"] = profile;
            }
            else
            {
                throw new eMineException("Invalid Username and/or Password");
            }

            return profile;
        }

        public void Logout()
        {
            signInManager.SignOut();
        }
    }
}
