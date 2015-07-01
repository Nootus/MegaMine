using eMine.Lib.Entities.Account;
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

            var user = new ApplicationUser { UserName = "prasanna@nootus.com"};
            //await userManager.CreateAsync(user, "Prasanna@123");

            var result = await signInManager.PasswordSignInAsync(userName, password, false, false);

            if (result.Succeeded)
            {
                var usr = await userManager.FindByNameAsync(userName);
                //var roleclaims = await userManager.cla (usr); 
                var userclaims = await userManager.GetClaimsAsync(usr);
                //string userId = await userManager.GetUserIdAsync(user);
                //var roles = await userManager.GetRolesAsync(user);

                ////getting the claims
                //var claims = await userManager.GetClaimsAsync(user);

                //string userId = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

                //profile = await accountRepository.UserProfileGet(userId);
                //profile.UserName = claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

                ////setting the claims on to the context
                //HttpHelper.HttpContext.Items["Profile"] = profile;
            }
            else
            {
                throw new eMineException("Invalid Username and/or Password");
            }
            return profile;
        }
    }
}
