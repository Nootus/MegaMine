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
        public DateTime? LastModifiedDate { get; set; }
        public bool DeletedInd { get; set; }
        public int CompanyId { get; set; }

        public BaseEntity()
        {
            CreatedUserId = "prasanna@nootus.com";  // TODO: change this to get the current logged in user
            CreatedDate = DateTime.UtcNow;
            LastModifiedUserId = "prasanna@nootus.com";
            LastModifiedDate = DateTime.UtcNow;
            DeletedInd = false;
            CompanyId = 1;
        }

        public virtual void UpdateAuditFields()
        {
            LastModifiedDate = DateTime.Now;
            LastModifiedUserId = "prasanna@nootus.com";  //TODO: Change this get the current user
        }
    }
}
