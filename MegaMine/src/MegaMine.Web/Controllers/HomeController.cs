using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using MegaMine.Web.Lib.Shared;

namespace MegaMine.Web.Controllers
{
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
