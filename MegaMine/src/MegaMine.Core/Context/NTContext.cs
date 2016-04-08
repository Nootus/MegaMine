using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using System.Threading.Tasks;

namespace MegaMine.Core.Context
{
    public static class NTContext
    {
        public static NTContextModel Context
        {
            get
            {
                return (NTContextModel)CallContext.LogicalGetData("MegaMineContext");
            }
        }

        public static void SetContext(NTContextModel model)
        {
            //CallContext.LogicalSetData("MegaMineContext", model);
            //return;

            if (model == null)
            {
                model = new NTContextModel();
            }

            NTContextModel contextModel = Context;

            if(contextModel == null)
            {
                CallContext.LogicalSetData("MegaMineContext", model);
            }
            else
            {
                contextModel = Mapper.Map<NTContextModel, NTContextModel>(model, contextModel);
            }
        }
    }
}
