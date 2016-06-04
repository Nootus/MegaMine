using MegaMine.Services.Security.Common;
using MegaMine.Services.Security.Domain;
using MegaMine.Services.Security.Models;
using MegaMine.Web.Lib.Shared;
using MegaMine.Web.Models.Shared;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
            return await AjaxHelper.SaveAsync(m => domain.Logout(), SecurityMessages.LogoutSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ChangePassword([FromBody] ChangePasswordModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.ChangePassword(model), SecurityMessages.ChangePasswordSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<ProfileModel>> ProfileGet()
        {
            return await AjaxHelper.GetAsync(m => domain.ProfileGet());
        }
    }
}
