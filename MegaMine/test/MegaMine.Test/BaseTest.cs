//-------------------------------------------------------------------------------------------------
// <copyright file="BaseTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Base class for testing framework which contains utility functions
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Test
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoMapper;
    using Core.Repositories;
    using MegaMine.Core.Context;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    public class BaseTest
    {
        protected void CreateAppContext()
        {
            NTContext.Context = new NTContextModel() { CompanyId = 1, UserName = "megamine@nootus.com" };
        }

        protected void InitializeMappingProfile<TProfile>()
            where TProfile : Profile, new()
        {
            Mapper.Initialize(x => x.AddProfile<TProfile>());
        }

        protected TContext CreateDbContext<TContext>()
            where TContext : DbContext
        {
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var builder = new DbContextOptionsBuilder<TContext>();
            builder.UseInMemoryDatabase()
                   .UseInternalServiceProvider(serviceProvider);

            return (TContext)Activator.CreateInstance(typeof(TContext), builder.Options);
        }

        protected async Task SaveChangesAsync(DbContext dbContext)
        {
            await dbContext.SaveChangesAsync();
            var entries = dbContext.ChangeTracker.Entries().ToList();
            foreach (var entry in entries)
            {
                entry.State = EntityState.Detached;
            }

            await dbContext.SaveChangesAsync();
        }

        protected TRepository CreateRepository<TContext, TRepository>(TContext context)
            where TContext : DbContext
            where TRepository : BaseRepository<TContext>
        {
            return (TRepository)Activator.CreateInstance(typeof(TRepository), context);
        }
    }
}
