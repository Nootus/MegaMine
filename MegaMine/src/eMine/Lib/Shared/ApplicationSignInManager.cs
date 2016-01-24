using eMine.Lib.Entities.Account;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.OptionsModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;

namespace eMine.Lib.Shared
{
    public class ApplicationSignInManager : SignInManager<ApplicationUser>
    {
        public ApplicationSignInManager(UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor, IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory, IOptions<IdentityOptions> optionsAccessor, ILogger<SignInManager<ApplicationUser>> logger)
            :base(userManager, contextAccessor, claimsFactory, optionsAccessor, logger)
        {

        }

        public override Task<ClaimsPrincipal> CreateUserPrincipalAsync(ApplicationUser user)
        {
            return base.CreateUserPrincipalAsync(user);
        }

    }
}
