using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Threading.Tasks;

namespace MegaMine.Core.Context
{
    public static class NTContext
    {
        public static NTContextProfileModel Profile
        {
            get
            {
                return (NTContextProfileModel)CallContext.LogicalGetData("ProfileContext");
            }
        }

        public static void SetProfile(NTContextProfileModel model)
        {
            CallContext.LogicalSetData("ProfileContext", model);
        }
    }
}
