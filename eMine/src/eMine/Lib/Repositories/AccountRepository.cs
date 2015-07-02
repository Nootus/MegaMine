using eMine.Models;
using eMine.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Repositories
{
    public class AccountRepository : BaseRepository
    {
        public AccountRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<ProfileModel> UserProfileGet(string userName)
        {
            var query = from users in dbContext.UserProfiles
                        join idn in dbContext.Users on users.UserProfileId equals idn.Id
                        where users.DeletedInd == false
                        && idn.UserName == userName
                        select new ProfileModel
                        {
                            UserID = users.UserProfileId,
                            FirstName = users.FirstName,
                            LastName = users.LastName,
                            UserName = idn.UserName
                        };

            ProfileModel model = await query.FirstOrDefaultAsync();

            //getting roles claims
            var rolesClaimsQuery = from roles in dbContext.UserRoles
                                  join claims in dbContext.RoleClaims on roles.RoleId equals claims.RoleId
                                  where roles.UserId == model.UserID
                                  select new ClaimModel
                                  {
                                      ClaimType = claims.ClaimType,
                                      ClaimValue = claims.ClaimValue
                                  };

            var roleClaims = await rolesClaimsQuery.ToListAsync();

            //getting user specific overrides
            var userClaimsQuery = from claim in dbContext.UserClaims
                                  where claim.UserId == model.UserID
                                  select new ClaimModel
                                  {
                                      ClaimType = claim.ClaimType,
                                      ClaimValue = claim.ClaimValue,
                                  };

            var userClaims = await userClaimsQuery.ToListAsync();

            //get the deny claims and remove them from the main claims
            var denyClaims = userClaims.Where(c => c.ClaimType.EndsWith("_Deny"));
            var denyClaimsCleanup = denyClaims.Select(c => new ClaimModel() { ClaimType = c.ClaimType.Replace("_Deny", ""), ClaimValue = c.ClaimValue });

            userClaims = (List<ClaimModel>) userClaims.Except(denyClaims);
            roleClaims = (List<ClaimModel>) roleClaims.Except(denyClaimsCleanup);

            model.Claims = (List<ClaimModel>) roleClaims.Union(userClaims);

            return model;
        }
    }
}
