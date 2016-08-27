//-------------------------------------------------------------------------------------------------
// <copyright file="AccountController.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  User security related functionality
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Controllers
{
    using System.Threading.Tasks;
    using MegaMine.Core.Helpers.Web;
    using MegaMine.Core.Models.Web;
    using MegaMine.Services.Security.Common;
    using MegaMine.Services.Security.Domain;
    using MegaMine.Services.Security.Models;
    using Microsoft.AspNetCore.Mvc;

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
            return await AjaxHelper.GetAsync(m => this.domain.Validate(model.UserName, model.UserPassword));
        }

        [HttpGet]
        public async Task<AjaxModel<NTModel>> Logout()
        {
            return await AjaxHelper.SaveAsync(m => this.domain.Logout(), SecurityMessages.LogoutSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ChangePassword([FromBody] ChangePasswordModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.ChangePassword(model), SecurityMessages.ChangePasswordSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<ProfileModel>> ProfileGet()
        {
            return await AjaxHelper.GetAsync(m => this.domain.ProfileGet());
        }
    }
}
