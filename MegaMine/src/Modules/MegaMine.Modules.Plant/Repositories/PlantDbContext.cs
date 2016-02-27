using MegaMine.Modules.Plant.Entities;
using Microsoft.Data.Entity;

namespace MegaMine.Modules.Plant.Repositories
{
    public class PlantDbContext : DbContext
    {
        public DbSet<MachineEntity> Machines { get; set; }
    }
}
