//-------------------------------------------------------------------------------------------------
// <copyright file="TestUtility.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Utility functions for testing framework
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Test
{
    using System;
    using AutoMapper;
    using Core.Repositories;
    using MegaMine.Core.Context;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    public static class TestUtility
    {
        public static void CreateAppContext()
        {
            NTContext.Context = new NTContextModel() { CompanyId = 1, UserName = "megamine@nootus.com" };
        }

        public static void InitializeMappingProfile<TProfile>()
            where TProfile : Profile, new()
        {
            Mapper.Initialize(x => x.AddProfile<TProfile>());
        }

        public static TContext CreateDbContext<TContext>()
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

        public static TRepository CreateRepository<TContext, TRepository>(TContext context)
            where TContext : DbContext
            where TRepository : BaseRepository<TContext>
        {
            return (TRepository)Activator.CreateInstance(typeof(TRepository), context);
        }
    }
}
