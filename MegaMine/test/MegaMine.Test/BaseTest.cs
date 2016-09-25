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
    using Moq;

    public class BaseTest
    {
        protected IServiceCollection ServiceCollection { get; set; }

        protected NTContextModel AppContext
        {
            get
            {
                return NTContext.Context;
            }
        }

        protected void CreateAppContext()
        {
            NTContext.Context = new NTContextModel() { CompanyId = 1, UserName = "megamine@nootus.com" };
        }

        protected TContext CreateDbContext<TContext>()
            where TContext : DbContext
        {
            this.ServiceCollection = new ServiceCollection();
            IServiceProvider serviceProvider = this.ServiceCollection
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var builder = new DbContextOptionsBuilder<TContext>();
            builder.UseInMemoryDatabase()
                   .UseInternalServiceProvider(serviceProvider);

            var mockContext = new Mock<TContext>(builder.Options) { CallBase = true };
            return mockContext.Object;
        }

        protected async Task SaveChangesAsync(params DbContext[] dbContexts)
        {
            foreach (DbContext context in dbContexts)
            {
                await context.SaveChangesAsync();
                var entries = context.ChangeTracker.Entries().ToList();
                foreach (var entry in entries)
                {
                    entry.State = EntityState.Detached;
                }

                await context.SaveChangesAsync();
            }
        }
    }
}
