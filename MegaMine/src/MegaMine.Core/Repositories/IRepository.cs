using MegaMine.Core.Context;
using Microsoft.EntityFrameworkCore;

namespace MegaMine.Core.Repositories
{
    public interface IRepository
    {
        DbContext DbContext { get; }
        NTContextModel AppContext { get; }
    }
}
