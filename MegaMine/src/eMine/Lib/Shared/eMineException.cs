using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Shared
{
    public class eMineException : Exception
    {
        string _message;
        public eMineException(string message)
        {
            _message = message;
        }

        public override string Message
        {
            get
            {
                return _message;
            }
        }
    }
}
