//-------------------------------------------------------------------------------------------------
// <copyright file="HomeController.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Controller for the startup page in the application
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Controllers
{
    using MegaMine.Core.Common;
    using Microsoft.AspNetCore.Mvc;

    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            this.ViewBag.EnvironmentName = SiteSettings.EnvironmentName;
            return this.View();
        }

        public IActionResult Error()
        {
            return this.View();
        }
    }
}
