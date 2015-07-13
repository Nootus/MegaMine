using eMine.Lib.Entities;
using eMine.Lib.Entities.Account;
using eMine.Lib.Shared;
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

            //getting roles
            var roleQuery = from userRoles in dbContext.UserRoles
                            join roles in dbContext.Roles on userRoles.RoleId equals roles.Id
                            where userRoles.UserId == model.UserID
                            select roles.Name;
            model.Roles = roleQuery.ToArray();
      
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
            var denyUserClaims = userClaims.Where(c => c.ClaimType.EndsWith(AccountSettings.DenySuffix)).ToList();
            var denyRoleClaims = denyUserClaims.Select(c => new ClaimModel() { ClaimType = c.ClaimType.Replace(AccountSettings.DenySuffix, ""), ClaimValue = c.ClaimValue }).ToList();

            userClaims = userClaims.Except(denyUserClaims).ToList();
            roleClaims = roleClaims.Except(denyRoleClaims, new ClaimModelComparer()).ToList();

            model.Claims = roleClaims.Union(userClaims).ToList();

            return model;
        }

        public List<IdentityPageEntity> IdentityPagesGet()
        {
            var query = from page in dbContext.IdentityPages select page;

            return query.ToList();
        }

        public List<ListItem<string, string>> IdentityRolesGet()
        {
            var dbroles = (from roles in dbContext.IdentityRoleHierarchies
                        join role in dbContext.Roles on roles.RoleId equals role.Id
                        join child in dbContext.Roles on roles.ChildRoleId equals child.Id
                        select new ListItem<string, string>() { Key = role.Name, Item = child.Name }).ToList();

            var hierarchy = dbroles.SelectMany(r => GetChildren(dbroles, r)).Distinct(new ListItemStringComparer()).OrderBy( r => r.Key).ToList();
            return hierarchy;
        }

        private List<ListItem<string, string>> GetChildren(List<ListItem<string, string>>  roles, ListItem<string, string> parent)
        {
            var childroles = roles.Where(r => r.Key == parent.Item).SelectMany(r => GetChildren(roles, r));
            //var childRoles = newroles.SelectMany(r => GetChildren(roles, r)).ToList();
            var newroles = childroles.Select(r => new ListItem<string, string>() { Key = parent.Key, Item = r.Item }).ToList();

            //adding itself
            newroles.Add(new ListItem<string, string>() { Key = parent.Key, Item = parent.Key });
            newroles.Add(new ListItem<string, string>() { Key = parent.Item, Item = parent.Item });
            newroles.Add(parent);
            return newroles;
        }
    }
}
