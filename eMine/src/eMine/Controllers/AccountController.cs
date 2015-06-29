using Microsoft.AspNet.Mvc;
using eMine.Models;
using eMine.Models.Shared;
using Microsoft.AspNet.Identity;
using eMine.Lib.Entities.Account;
using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using eMine.Lib.Domain;
using eMine.Lib.Shared;

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

            //AjaxModel<ProfileModel> ajax = null;
            //ProfileModel profile = new ProfileModel()
            //{
            //    FirstName = "Prasanna",
            //    LastName = "Pattam",
            //    UserName = "prasanna",
            //    UserID = 1
            //};

            //var user = new ApplicationUser { UserName = model.UserName };
            //var result = await UserManager.CreateAsync(user, "Prasanna@123");

            //ActionContext.HttpContext.Items.Add("Test", "Hello");
            //var abc = new FleetDomain().VehicleList();

            //await SignInManager.SignInAsync(user, isPersistent: false);
            //var result = await SignInManager.PasswordSignInAsync(model.UserName, model.UserPassword, false, false);

            //if (result.Succeeded)
            //    ajax = new AjaxModel<ProfileModel>() { Result = AjaxResult.Success, Message = "", Model = profile };
            //else
            //    ajax = new AjaxModel<ProfileModel>() { Result = AjaxResult.Exception, Message = "Password incorrect", Model = null };

            //ajax = new AjaxModel<ProfileModel>() { Result = AjaxResult.Success, Message = "", Model = profile };
            //return ajax;
        }
    }
}
