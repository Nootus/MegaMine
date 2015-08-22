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
            return await AjaxHelper.GetAsync<ProfileModel>(m => domain.Validate(model.UserName, model.UserPassword));
        }

        [HttpGet]
        public AjaxModel<string> Logout()
        {
            return AjaxHelper.Get<string>(m => domain.Logout(), Messages.Account.LogoutSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<ProfileModel>> DefaultProfile()
        {
            return await AjaxHelper.GetAsync<ProfileModel>(m => domain.DefaultProfile());
        }
    }
}
