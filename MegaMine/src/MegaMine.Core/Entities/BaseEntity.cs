using MegaMine.Core.Context;
using System;

namespace MegaMine.Core.Entities
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
            var contextModel = NTContext.Context;

            if (contextModel != null)
            {
                CreatedUserId = contextModel.UserName;
                LastModifiedUserId = contextModel.UserName;
                CompanyId = contextModel.CompanyId;
            }
            CreatedDate = DateTime.UtcNow;
            LastModifiedDate = DateTime.UtcNow;
            DeletedInd = false;
        }

        public virtual void UpdateAuditFields()
        {
            var contextModel = NTContext.Context;

            LastModifiedDate = DateTime.UtcNow;
            LastModifiedUserId = contextModel.UserName;  //TODO: Change this get the current user
        }
    }
}
