using eMine.Lib.Shared;
using eMine.Models;
using eMine.Models.Account;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities
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
            ProfileModel profile = (ProfileModel) HttpHelper.HttpContext.Items["Profile"];

            if(profile != null)
            {
                CreatedUserId = profile.UserID;
                CreatedDate = DateTime.UtcNow;
                LastModifiedUserId = profile.UserID;
                LastModifiedDate = DateTime.UtcNow;
                DeletedInd = false;
                CompanyId = profile.CompanyId;
            }
        }

        public virtual void UpdateAuditFields()
        {
            ProfileModel profile = (ProfileModel)HttpHelper.HttpContext.Items["Profile"];

            LastModifiedDate = DateTime.UtcNow;
            LastModifiedUserId = profile.UserID;  //TODO: Change this get the current user
        }
    }
}
