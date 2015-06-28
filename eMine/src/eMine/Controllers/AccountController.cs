using Microsoft.AspNet.Mvc;
using eMine.Models;
using eMine.Models.Shared;
using Microsoft.AspNet.Identity;
using eMine.Lib.Entities.Account;
using System.Threading.Tasks;
using Microsoft.AspNet.Http;
using eMine.Lib.Domain;

namespace eMine.Controllers
{
    public class AccountController : Controller
    {
        //public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        //{
        //    UserManager = userManager;
        //    SignInManager = signInManager;
        //}

        //public UserManager<ApplicationUser> UserManager { get; private set; }
        //public SignInManager<ApplicationUser> SignInManager { get; private set; }

        [HttpPost]
        public async Task<AjaxModel<ProfileModel>> Validate([FromBody] LoginModel model)
        {
            AjaxModel<ProfileModel> ajax = null;
            ProfileModel profile = new ProfileModel()
            {
                FirstName = "Prasanna",
                LastName = "Pattam",
                UserName = "prasanna",
                UserID = 1
            };

            //var user = new ApplicationUser { UserName = model.UserName };
            //var result = await UserManager.CreateAsync(user, "Prasanna@123");

            ActionContext.HttpContext.Items.Add("Test", "Hello");
            //var abc = new FleetDomain().VehicleList();

            //await SignInManager.SignInAsync(user, isPersistent: false);
            //var result = await SignInManager.PasswordSignInAsync(model.UserName, model.UserPassword, false, false);

            //if (result.Succeeded)
            //    ajax = new AjaxModel<ProfileModel>() { Result = AjaxResult.Success, Message = "", Model = profile };
            //else
            //    ajax = new AjaxModel<ProfileModel>() { Result = AjaxResult.Exception, Message = "Password incorrect", Model = null };

            ajax = new AjaxModel<ProfileModel>() { Result = AjaxResult.Success, Message = "", Model = profile };
            return ajax;
        }
    }
}
