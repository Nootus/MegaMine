using eMine.Lib.Entities.Account;
using eMine.Lib.Repositories;
using eMine.Models.Shared;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.OptionsModel;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eMine.Lib.Shared
{
    public class ApplicationSignInManager : SignInManager<ApplicationUser>
    {
        private AccountRepository accountRepository;

        public ApplicationSignInManager(AccountRepository accountRepository, UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor, IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory, IOptions<IdentityOptions> optionsAccessor, ILogger<SignInManager<ApplicationUser>> logger)
            :base(userManager, contextAccessor, claimsFactory, optionsAccessor, logger)
        {
            this.accountRepository = accountRepository;
        }

        public override async Task<ClaimsPrincipal> CreateUserPrincipalAsync(ApplicationUser user)
        {
            var principal = await base.CreateUserPrincipalAsync(user);
            ClaimsIdentity identity = (ClaimsIdentity)principal.Identity;
            var profile = await Profile.Get(user.UserName, accountRepository);

            //var profile = Profile.Current;
            string companies = String.Join(",", profile.Companies.Select(s => s.CompanyId.ToString()));
            string adminRoles = String.Join(",", profile.Roles.Select(r => r.Name.ToString()));

            //adding custom claim
            identity.AddClaim(new Claim(NTClaimTypes.FirstName, profile.FirstName));
            identity.AddClaim(new Claim(NTClaimTypes.LastName, profile.LastName));
            identity.AddClaim(new Claim(NTClaimTypes.CompanyId, profile.CompanyId.ToString()));
            identity.AddClaim(new Claim(NTClaimTypes.Companies, companies));

            return principal;
        }

    }
}
