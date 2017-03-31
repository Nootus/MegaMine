//-------------------------------------------------------------------------------------------------
// <copyright file="WidgetStartup.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Widget project startup which defines the dependency injection objects
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Widget
{
    using AutoMapper;
    using MegaMine.Core;
    using MegaMine.Services.Widget.Domain;
    using MegaMine.Services.Widget.Mapping;
    using MegaMine.Services.Widget.Repositories;
    using Microsoft.Extensions.DependencyInjection;

    public class WidgetStartup : ModuleStartup<WidgetDbContext>
    {
        public override void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.AddTransient<WidgetDomain>();
            services.AddTransient<WidgetRepository>();
        }
    }
}
