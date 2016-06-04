using AutoMapper;
using Microsoft.AspNetCore.Http;
using System.Runtime.Remoting.Messaging;

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
            set
            {
                NTContextModel model = value;
                if (model == null)
                {
                    model = new NTContextModel();
                }

                NTContextModel contextModel = Context;

                if (contextModel == null)
                {
                    CallContext.LogicalSetData("MegaMineContext", model);
                }
                else
                {
                    contextModel = Mapper.Map<NTContextModel, NTContextModel>(model, contextModel);
                }

            }
        }

        public static HttpContext HttpContext
        {
            get
            {
                return (HttpContext)CallContext.LogicalGetData("HttpContext");
            }
            set
            {
                CallContext.LogicalSetData("HttpContext", value);
            }
        }
    }
}
