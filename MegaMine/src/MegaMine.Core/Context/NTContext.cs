//-------------------------------------------------------------------------------------------------
// <copyright file="NTContext.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  This stores the HttpContext and MegaMineContext in the async call context so that they are
//  available through out the execution cycle
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Core.Context
{
    using System.Runtime.Remoting.Messaging;
    using AutoMapper;
    using Microsoft.AspNetCore.Http;

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
