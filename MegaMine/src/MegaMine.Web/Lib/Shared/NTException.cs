using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Web.Lib.Shared
{
    public class NTException : Exception
    {
        private string message;
        private object model;
        public NTException(string message)
        {
            this.message = message;
        }

        public NTException(string message, object model) : this(message)
        {
            this.model = model;
        }

        public override string Message
        {
            get
            {
                return message;
            }
        }

        public object Model
        {
            get
            {
                return model;
            }
        }
    }
}
