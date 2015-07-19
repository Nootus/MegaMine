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
            var profile = Profile.Current;

            CreatedUserId = profile.UserName;
            CreatedDate = DateTime.UtcNow;
            LastModifiedUserId = profile.UserName;
            LastModifiedDate = DateTime.UtcNow;
            DeletedInd = false;
            CompanyId = profile.CompanyId;
        }

        public virtual void UpdateAuditFields()
        {
            var profile = Profile.Current;

            LastModifiedDate = DateTime.UtcNow;
            LastModifiedUserId = profile.UserName;  //TODO: Change this get the current user
        }
    }
}
