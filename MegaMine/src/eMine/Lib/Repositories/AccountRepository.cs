using eMine.Lib.Entities;
using eMine.Lib.Entities.Account;
using eMine.Lib.Shared;
using eMine.Models.Account;
using eMine.Models.Administration;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Entity;
using AutoMapper;
using eMine.Lib.Entities.Administration;
using Microsoft.AspNet.Identity.EntityFramework;

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
                            UserId = users.UserProfileId,
                            FirstName = users.FirstName,
                            LastName = users.LastName,
                            UserName = idn.UserName,
                            CompanyId = users.CompanyId
                        };

            ProfileModel model = await query.FirstOrDefaultAsync();

            var companyQuery = from cmp in dbContext.Companies
                               join usrcmp in dbContext.UserCompanies on cmp.CompanyId equals usrcmp.CompanyId
                               where usrcmp.UserProfileId == model.UserId
                               && cmp.DeletedInd == false
                               select Mapper.Map<CompanyEntity, CompanyModel>(cmp);
            model.Companies = await companyQuery.ToListAsync();

            //getting roles and claims
            await UserProfileGetRolesClaims(model);

            return model;
        }

        public async Task UserProfileGetRolesClaims(ProfileModel model)
        {
            int companyId = model.CompanyId;
            string userId = model.UserId;

            //getting SuperAdmin or GroupAdmin roles
            var adminRoleQuery = from userRoles in dbContext.UserRoles
                                    join roles in dbContext.Roles on userRoles.RoleId equals roles.Id
                                    where userRoles.UserId == userId
                                        && AccountSettings.SuperGroupAdminRoles.Contains(roles.RoleType)
                                    select Mapper.Map<ApplicationRole, RoleModel>(roles);
            var adminRoles = await adminRoleQuery.ToArrayAsync();

            //For SuperAdmin and GroupAdmin roles get the companies
            if (adminRoles.Length >= 0)
            {
                if (adminRoles.Any(r => r.RoleType == (int)RoleType.SuperAdmin))
                {
                    //getting all companies
                    model.Companies = await (from cmp in dbContext.Companies where cmp.DeletedInd == false select Mapper.Map<CompanyEntity, CompanyModel>(cmp)).ToListAsync();
                }
                else if (adminRoles.Any(r => r.RoleType == (int)RoleType.GroupAdmin))
                {
                    //getting all companies in that group
                    CompanyEntity company = await (from cmp in dbContext.Companies where cmp.CompanyId == companyId select cmp).SingleAsync();

                    int groupCompanyId = company.ParentCompanyId ?? companyId;

                    model.Companies = await (from cmp in dbContext.Companies where cmp.DeletedInd == false
                                                && (cmp.CompanyId == companyId || cmp.ParentCompanyId == companyId)
                                             select Mapper.Map<CompanyEntity, CompanyModel>(cmp)).ToListAsync();
                }

                model.AdminRoles = adminRoles.Select(s => s.Name).ToArray();
                model.Claims = new List<ClaimModel>();
            }
            else
            {
                //getting company admin role
                var companyRoleQuery = from userRoles in dbContext.UserRoles
                                join roles in dbContext.Roles on userRoles.RoleId equals roles.Id
                                where userRoles.UserId == userId
                                    && roles.CompanyId == companyId
                                    && roles.RoleType == (int)RoleType.CompanyAdmin
                                select roles.Name; 
                model.AdminRoles = await companyRoleQuery.ToArrayAsync();

                //getting roles claims if user is not a company admin
                if (model.AdminRoles.Length > 0)
                {
                    model.Claims = new List<ClaimModel>();
                }
                else
                {
                    var rolesClaimsQuery = from userRoles in dbContext.UserRoles
                                           join roles in dbContext.Roles on userRoles.RoleId equals roles.Id
                                           join claims in dbContext.RoleClaims on userRoles.RoleId equals claims.RoleId
                                           where userRoles.UserId == userId
                                                 && roles.CompanyId == companyId
                                           select Mapper.Map<IdentityRoleClaim<string>, ClaimModel>(claims);

                    var roleClaims = await rolesClaimsQuery.ToListAsync();

                    //getting user specific overrides
                    var userClaimsQuery = from claim in dbContext.UserClaims
                                          where claim.UserId == userId
                                          select Mapper.Map<IdentityUserClaim<string>, ClaimModel>(claim);

                    var userClaims = await userClaimsQuery.ToListAsync();

                    //get the deny claims and remove them from the main claims
                    var denyUserClaims = userClaims.Where(c => c.ClaimType.EndsWith(AccountSettings.DenySuffix)).ToList();
                    var denyRoleClaims = denyUserClaims.Select(c => new ClaimModel() { ClaimType = c.ClaimType.Replace(AccountSettings.DenySuffix, ""), ClaimValue = c.ClaimValue }).ToList();

                    userClaims = userClaims.Except(denyUserClaims).ToList();
                    roleClaims = roleClaims.Except(denyRoleClaims, new ClaimModelComparer()).ToList();

                    model.Claims = roleClaims.Union(userClaims).ToList();
                }
            }
        }

        public List<IdentityPageEntity> IdentityPagesGet()
        {
            var query = from page in dbContext.IdentityPages.Include(c => c.Claims).ThenInclude(a => a.Claim) select page;
            return query.ToList();
        }

        public List<IdentityMenuPageEntity> IdentityMenuPagesGet()
        {
            var query = from menuPage in dbContext.IdentityMenuPages where menuPage.DeletedInd == false select menuPage;
            return query.ToList();
        }

        public List<CompanyEntity> IdentityCompanyClaimsGet()
        {
            var query = from company in dbContext.Companies.Include(c => c.Claims).ThenInclude(a => a.Claim) select company;
            return query.ToList();
        }

        public List<ListItem<string, string>> IdentityAdminRolesGet()
        {
            var dbroles = (from roles in dbContext.IdentityRoleHierarchies
                           join role in dbContext.Roles on roles.RoleId equals role.Id
                           join child in dbContext.Roles on roles.ChildRoleId equals child.Id
                           select new ListItem<string, string>() { Key = role.Name, Item = child.Name }).ToList();

            var hierarchy = dbroles.SelectMany(r => GetChildren(dbroles, r)).Distinct(new ListItemStringComparer()).OrderBy(r => r.Key).ToList();
            return hierarchy;
        }

        private List<ListItem<string, string>> GetChildren(List<ListItem<string, string>>  roles, ListItem<string, string> parent)
        {
            var childroles = roles.Where(r => r.Key == parent.Item).SelectMany(r => GetChildren(roles, r));
            var newroles = childroles.Select(r => new ListItem<string, string>() { Key = parent.Key, Item = r.Item }).ToList();

            //adding itself
            newroles.Add(new ListItem<string, string>() { Key = parent.Key, Item = parent.Key });
            newroles.Add(new ListItem<string, string>() { Key = parent.Item, Item = parent.Item });
            newroles.Add(parent);
            return newroles;
        }
    }
}
