using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MegaMine.Core
{
    public interface IModuleStartup
    {
        void Startup(IConfigurationRoot configuration);
        void ConfigureServices(IServiceCollection services);
        void ConfigureDependencyInjection(IServiceCollection services);
        void ConfigureMapping(AutoMapper.IConfiguration action);
    }
}
