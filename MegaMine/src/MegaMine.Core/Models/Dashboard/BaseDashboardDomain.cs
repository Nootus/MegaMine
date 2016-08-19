//-------------------------------------------------------------------------------------------------
// <copyright file="BaseDashboardDomain.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Abstract class for Dashboards widgets
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Core.Models.Dashboard
{
    using System.Threading.Tasks;
    using MegaMine.Core.Context;

    public abstract class BaseDashboardDomain
    {
        protected int CompanyId
        {
            get
            {
                return NTContext.Context.CompanyId;
            }
        }

        public abstract Task<ChartModel<string, int>> GetWidgetData(int widgetId, WidgetOptions options);
    }
}
