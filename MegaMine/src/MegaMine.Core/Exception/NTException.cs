using System.Collections.Generic;

namespace MegaMine.Core.Exception
{
    public class NTException : System.Exception
    {
        private string message;
        private List<NTError> errors;

        public NTException(string message)
        {
            this.message = message;
        }

        public NTException(string message, List<NTError> errors) : this(message)
        {
            this.errors = errors;
        }

        public override string Message
        {
            get
            {
                return message;
            }
        }

        public List<NTError> Errors
        {
            get
            {
                return errors;
            }
        }
    }
}
