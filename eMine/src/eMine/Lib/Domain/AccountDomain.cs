using eMine.Lib.Entities.Account;
using eMine.Lib.Shared;
using eMine.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Domain
{
    public class AccountDomain
    {
        private UserManager<ApplicationUser> userManager;
        private SignInManager<ApplicationUser> signInManager;


        public AccountDomain(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public async Task<ProfileModel> Validate(string userName, string password)
        {
            ProfileModel profile = null;

            //var user = new ApplicationUser { UserName = "prasanna@nootus.com"};
            //await userManager.CreateAsync(user, "Prasanna@123");

            var result = await signInManager.PasswordSignInAsync(userName, password, false, false);

            if (result.Succeeded)
            {
                profile = new ProfileModel()
                {
                    FirstName = "Prasanna",
                    LastName = "Pattam",
                    UserName = "prasanna",
                    UserID = 1
                };
            }
            else
            {
                throw new eMineException("Invalid Username and/or Password");
            }
            return profile;
        }
    }
}
