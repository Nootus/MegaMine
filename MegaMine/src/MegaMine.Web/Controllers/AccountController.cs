using Microsoft.AspNet.Mvc;
using MegaMine.Web.Models;
using MegaMine.Web.Models.Shared;
using Microsoft.AspNet.Identity;
using MegaMine.Web.Lib.Entities.Account;
using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using MegaMine.Web.Lib.Domain;
using MegaMine.Web.Lib.Shared;
using MegaMine.Web.Models.Account;

namespace MegaMine.Web.Controllers
{
    public class AccountController : Controller
    {
        private AccountDomain domain;
        public AccountController(AccountDomain domain)
        {
            this.domain = domain;
        }

        [HttpPost]
        public async Task<AjaxModel<ProfileModel>> Validate([FromBody] LoginModel model)
        {
            return await AjaxHelper.GetAsync(m => domain.Validate(model.UserName, model.UserPassword));
        }

        [HttpGet]
        public async Task<AjaxModel<NTModel>> Logout()
        {
            return await AjaxHelper.SaveAsync(m => domain.Logout(), Messages.Account.LogoutSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ChangePassword([FromBody] ChangePasswordModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.ChangePassword(model), Messages.Account.ChangePasswordSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<ProfileModel>> ProfileGet()
        {
            return await AjaxHelper.GetAsync(m => domain.ProfileGet());
        }
    }
}
