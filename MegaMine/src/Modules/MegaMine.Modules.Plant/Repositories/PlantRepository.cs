using MegaMine.Core.Models;
using MegaMine.Core.Repositories;
using MegaMine.Modules.Plant.Entities;
using MegaMine.Modules.Plant.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MegaMine.Modules.Plant.Repositories
{
    public class PlantRepository : BaseRepository<PlantDbContext>
    {
        public PlantRepository(PlantDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        #region Machine
        public async Task<List<ListItem<int, string>>> MachineListItemGet()
        {
            return await GetListItemsAsync<MachineEntity>(e => new ListItem<int, string> { Key = e.MachineId, Item = e.Name}, s => s.Name);
        }
        public async Task<List<MachineModel>> MachinesGet()
        {
            return await GetListAsync<MachineEntity, MachineModel>(s => s.Name);
        }

        public async Task MachineSave(MachineModel model)
        {
            await SaveEntity<MachineEntity, MachineModel>(model);
        }

        public async Task MachineDelete(int machineId)
        {
            await DeleteEntity<MachineEntity>(machineId);
        }
        #endregion

        #region Blade
        public async Task<List<ListItem<int, string>>> BladeListItemGet()
        {
            return await GetListItemsAsync<BladeEntity>(e => new ListItem<int, string> { Key = e.BladeId, Item = e.Name }, s => s.Name);
        }
        public async Task<List<BladeModel>> BladesGet()
        {
            return await GetListAsync<BladeEntity, BladeModel>(s => s.Name);
        }

        public async Task BladeSave(BladeModel model)
        {
            await SaveEntity<BladeEntity, BladeModel>(model);
        }

        public async Task BladeDelete(int bladeId)
        {
            await DeleteEntity<BladeEntity>(bladeId);
        }
        #endregion

        #region Operator
        public async Task<List<ListItem<int, string>>> OperatorListItemGet()
        {
            return await GetListItemsAsync<OperatorEntity>(e => new ListItem<int, string> { Key = e.OperatorId, Item = e.Name }, s => s.Name);
        }
        public async Task<List<OperatorModel>> OperatorsGet()
        {
            return await GetListAsync<OperatorEntity, OperatorModel>(s => s.Name);
        }

        public async Task OperatorSave(OperatorModel model)
        {
            await SaveEntity<OperatorEntity, OperatorModel>(model);
        }

        public async Task OperatorDelete(int operatorId)
        {
            await DeleteEntity<OperatorEntity>(operatorId);
        }
        #endregion
    }
}
