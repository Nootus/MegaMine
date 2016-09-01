namespace MegaMine.Modules.Quarry.Tests.Controller
{
    using Core.Context;
    using Core.Models;
    using Core.Repositories;
    using Entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;
    using Repositories;
    using System;
    using System.Collections.Generic;
    using Xunit;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading.Tasks;
    using AutoMapper;
    using Mapping;

    public class QuarryControllerTest
    {
        public QuarryControllerTest()
        {
        }

        [Fact]
        public async Task Test1()
        {
            // Arrange
            Mapper.Initialize(x => x.AddProfile<QuarryMappingProfile>());
            CreateAppContext();
            QuarryDbContext dbContext = CreateDbContext<QuarryDbContext>();
            dbContext.MaterialColours.AddRange(
                    new MaterialColourEntity() { MaterialColourId = 1, ColourName = "Red", CompanyId = 1, DeletedInd = false },
                    new MaterialColourEntity() { MaterialColourId = 2, ColourName = "Blue", CompanyId = 1, DeletedInd = false }
                );
            await dbContext.SaveChangesAsync();

            QuarryRepository repository = CreateRepository<QuarryDbContext, QuarryRepository>(dbContext);

            // Act
            var colours = await repository.MaterialColoursGet();

            // Assert
            Assert.Equal(colours[1].ColourName, "Red");
            //Assert.True(true);

        }

        private static void CreateAppContext()
        {
            NTContext.Context = new NTContextModel() { CompanyId = 1, UserName = "megamine@nootus.com" };
        }

        private static TContext CreateDbContext<TContext>()
            where TContext: DbContext
        {
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            var builder = new DbContextOptionsBuilder<TContext>();
            builder.UseInMemoryDatabase()
                   .UseInternalServiceProvider(serviceProvider);

            return (TContext)Activator.CreateInstance(typeof(TContext), builder.Options);
        }

        private static TRepository CreateRepository<TContext, TRepository>(TContext context)
            where TContext : DbContext
            where TRepository: BaseRepository<TContext>
        {
            return (TRepository)Activator.CreateInstance(typeof(TRepository), context);
        }

    }
}
