using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MegaMine.Core
{
    public interface IModuleStartup
    {
        void Initialize(IConfigurationRoot configuration);
        void ConfigureServices(IServiceCollection services);
        void ConfigureDependencyInjection(IServiceCollection services);
        void ConfigureMapping(AutoMapper.IConfiguration action);
    }
}
