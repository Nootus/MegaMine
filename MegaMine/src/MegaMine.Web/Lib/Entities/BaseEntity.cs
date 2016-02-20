using MegaMine.Web.Lib.Context;
using MegaMine.Web.Lib.Shared;
using MegaMine.Web.Models;
using MegaMine.Web.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Lib.Entities
{
    public class BaseEntity
    {
        public string CreatedUserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string LastModifiedUserId { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public bool DeletedInd { get; set; }
        public int CompanyId { get; set; }

        public BaseEntity()
        {
            var contextProfileModel = NTContext.Profile;

            if (contextProfileModel != null)
            {
                CreatedUserId = contextProfileModel.UserName;
                LastModifiedUserId = contextProfileModel.UserName;
                CompanyId = contextProfileModel.CompanyId;
            }
            CreatedDate = DateTime.UtcNow;
            LastModifiedDate = DateTime.UtcNow;
            DeletedInd = false;
        }

        public virtual void UpdateAuditFields()
        {
            var contextProfileModel = NTContext.Profile;

            LastModifiedDate = DateTime.UtcNow;
            LastModifiedUserId = contextProfileModel.UserName;  //TODO: Change this get the current user
        }
    }
}
