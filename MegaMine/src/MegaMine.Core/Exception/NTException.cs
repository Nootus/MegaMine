namespace MegaMine.Core.Exception
{
    public class NTException : System.Exception
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
