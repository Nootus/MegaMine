using Microsoft.AspNet.Mvc;
using eMine.Models;
using eMine.Models.Shared;

namespace eMine.Controllers
{
    public class AccountController : Controller
    {
        [HttpPost]
        public AjaxModel<ProfileModel> Validate([FromBody] LoginModel model)
        {
            AjaxModel<ProfileModel> ajax = null;
            ProfileModel profile = new ProfileModel()
            {
                FirstName = "Prasanna",
                LastName = "Pattam",
                UserName = "prasanna",
                UserID = 1
            };

            ajax = new AjaxModel<ProfileModel>() { Result = AjaxResult.Success, Message = "", Model = profile };

            return ajax;
        }
    }
}
