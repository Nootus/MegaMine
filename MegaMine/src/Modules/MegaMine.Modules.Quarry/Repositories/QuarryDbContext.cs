using MegaMine.Core.Repositories;
using MegaMine.Core.Widgets;
using MegaMine.Modules.Quarry.Entities;
using Microsoft.EntityFrameworkCore;

namespace MegaMine.Modules.Quarry.Repositories
{
    public class QuarryDbContext : BaseDbContext<QuarryDbContext>
    {
        public DbSet<MaterialColourEntity> MaterialColours { get; set; }
        public DbSet<ProductTypeEntity> ProductTypes { get; set; }
        public DbSet<QuarryEntity> Quarries { get; set; }
        public DbSet<QuarryMaterialColourEntity> QuarryMaterialColours { get; set; }
        public DbSet<YardEntity> Yards { get; set; }
        public DbSet<MaterialEntity> Materials { get; set; }
        public DbSet<MaterialMovementEntity> MaterialMovements { get; set; }
        public DbSet<ProductSummaryEntity> ProductSummary { get; set; }

        public DbSet<StockEntity> StockGet { get; set; }
        //Widgets
        public DbSet<ChartEntity<string, int>> ChartEntities { get; set; }

        public QuarryDbContext(DbContextOptions<QuarryDbContext> options)
            : base(options)
        {
        }

    }
}
