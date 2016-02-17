using Microsoft.AspNet.Mvc;
using eMine.Models;
using eMine.Models.Shared;
using Microsoft.AspNet.Identity;
using eMine.Lib.Entities.Account;
using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using eMine.Lib.Domain;
using eMine.Lib.Shared;
using eMine.Models.Account;

namespace eMine.Controllers
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
