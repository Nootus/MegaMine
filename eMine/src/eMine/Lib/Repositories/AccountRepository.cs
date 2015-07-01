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

            //var userClaimsQuery = from roles in dbContext.UserRoles
            //                      join claims in dbContext.RoleClaims on roles.RoleId equals claims.RoleId
            //                      where roles.UserId == model.UserID
            //                      select new Claims
            //                      {

            //                      }

            return model;
        }
    }
}
