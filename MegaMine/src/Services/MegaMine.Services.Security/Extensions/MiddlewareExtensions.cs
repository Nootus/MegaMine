﻿//-------------------------------------------------------------------------------------------------
// <copyright file="MiddlewareExtensions.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Extension method for the profile middleware
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Security.Extensions
{
    using MegaMine.Services.Security.Middleware;
    using MegaMine.Services.Security.Repositories;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.Extensions.DependencyInjection;

    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseProfileMiddleware(this IApplicationBuilder app)
        {
            return app.UseMiddleware<ProfileMiddleware>();
        }

        public static IServiceCollection CachePageClaimsRoles(this IServiceCollection services)
        {
            SecurityRepository repository = services.BuildServiceProvider().GetRequiredService<SecurityRepository>();
            PageService.CachePageClaimsRoles(repository);
            return services;
        }
    }
}
