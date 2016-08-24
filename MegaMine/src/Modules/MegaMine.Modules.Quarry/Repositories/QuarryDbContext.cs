//-------------------------------------------------------------------------------------------------
// <copyright file="QuarryDbContext.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  EF database context for Quarry tables
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Repositories
{
    using MegaMine.Core.Models.Dashboard;
    using MegaMine.Core.Repositories;
    using MegaMine.Modules.Quarry.Entities;
    using Microsoft.EntityFrameworkCore;

    public class QuarryDbContext : BaseDbContext<QuarryDbContext>
    {
        public QuarryDbContext(DbContextOptions<QuarryDbContext> options)
            : base(options)
        {
        }

        public DbSet<MaterialColourEntity> MaterialColours { get; set; }

        public DbSet<ProductTypeEntity> ProductTypes { get; set; }

        public DbSet<ProcessTypeEntity> ProcessTypes { get; set; }

        public DbSet<TextureEntity> Textures { get; set; }

        public DbSet<QuarryEntity> Quarries { get; set; }

        public DbSet<QuarryMaterialColourEntity> QuarryMaterialColours { get; set; }

        public DbSet<YardEntity> Yards { get; set; }

        public DbSet<MaterialEntity> Materials { get; set; }

        public DbSet<MaterialMovementEntity> MaterialMovements { get; set; }

        public DbSet<ProductSummaryEntity> ProductSummary { get; set; }

        public DbSet<StockEntity> StockGet { get; set; }

        // Widgets
        public DbSet<ChartEntity<string, int>> ChartEntities { get; set; }
    }
}
