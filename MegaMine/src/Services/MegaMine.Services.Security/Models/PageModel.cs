﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Services.Security.Models
{
    public class PageModel
    {
        public int PageId { get; set; }
        public string Text { get; set; }
        public string Controller { get; set; }
        public string ActionMethod { get; set; }
        public bool DashboardInd { get; set; }
        //public List<PageClaimModel> Claims { get; set; }

        //public IEnumerable<ClaimModel> PageClaims
        //{
        //    get
        //    {
        //        return Claims.Select(s => s.Claim);
        //    }
        //}
    }
}
