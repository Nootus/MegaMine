using MegaMine.Modules.Quarry.Entities;
using Microsoft.Data.Entity;

namespace MegaMine.Modules.Quarry.Repositories
{
    public class QuarryDbContext : DbContext
    {
        public DbSet<MaterialColourEntity> MaterialColours { get; set; }
        public DbSet<ProductTypeEntity> ProductTypes { get; set; }
        public DbSet<QuarryEntity> Quarries { get; set; }
        public DbSet<QuarryMaterialColourEntity> QuarryMaterialColours { get; set; }
        public DbSet<YardEntity> Yards { get; set; }
        public DbSet<MaterialEntity> Materials { get; set; }
        public DbSet<MaterialMovementEntity> MaterialMovements { get; set; }
        public DbSet<ProductSummaryEntity> ProductSummary { get; set; }
    }
}
