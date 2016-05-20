using MegaMine.Core.Context;
using Microsoft.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Core.Repositories
{
    public interface IRepository
    {
        DbContext DbContext { get; }
        NTContextModel AppContext { get; }
    }
}
