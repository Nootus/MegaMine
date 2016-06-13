using MegaMine.Core.Models.Widget;

namespace MegaMine.Core.Models.Web
{
    public class AjaxModel<T>
    {
        public AjaxResult Result { get; set; }
        public string Message { get; set; }
        public T Model { get; set; }
        public DashboardModel Dashboard { get; set; }
    }
}
