using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Core.Common
{
    public static class SiteSettings
    {
        public static string ConnectionString { get; set; }
        public static string WebPath { get; set; }

        public static string EnvironmentName { get; set; }

        public static bool IsEnvironment(string environmentName)
        {
            return String.Equals(environmentName, EnvironmentName, StringComparison.OrdinalIgnoreCase);
        }
    }
}
