using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities
{
    public class BaseEntity
    {
        public int CreatedUserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? LastModifiedUserId { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public bool DeletedInd { get; set; }
        public int CompanyId { get; set; }

        public BaseEntity()
        {
            CreatedUserId = 0;  // TODO: change this to get the current logged in user
            CreatedDate = DateTime.UtcNow;
            LastModifiedUserId = 0;
            LastModifiedDate = DateTime.UtcNow;
            DeletedInd = false;
            CompanyId = 1;
        }

        public virtual void UpdateAuditFields()
        {
            LastModifiedDate = DateTime.Now;
            LastModifiedUserId = 0;  //TODO: Change this get the current user
        }
    }
}
