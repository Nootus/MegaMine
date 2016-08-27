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
    using Microsoft.AspNetCore.Mvc;
    using MegaMine.Core.Common;

    public class HomeController : Controller
    {
        public  IActionResult Index()
        {
            ViewBag.EnvironmentName = SiteSettings.EnvironmentName;
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
