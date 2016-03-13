using MegaMine.Core.Models;
using MegaMine.Core.Repositories;
using MegaMine.Modules.Plant.Entities;
using MegaMine.Modules.Plant.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.Data.Entity;

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
            //return await GetListAsync<MachineEntity, MachineModel>(s => s.Name);
            var query = from mac in dbContext.Machines
                        join bld in dbContext.Blades on mac.BladeId equals bld.BladeId
                        where mac.CompanyId == profile.CompanyId
                        && mac.DeletedInd == false
                        select new MachineModel()
                        {
                            MachineId = mac.MachineId,
                            Name = mac.Name,
                            BladeId = mac.BladeId,
                            BladeName = bld.Name,
                            Description = mac.Description
                        };

            return await query.ToListAsync();
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

        #region Dressing

        public async Task DressingSave(DressingViewModel viewModel)
        {
            await dbContext.Database.BeginTransactionAsync();

            //Saving Dressing Model
            DressingEntity dressingEntity = await SaveEntity<DressingEntity, DressingModel>(viewModel.Model, false);
            BlockDressingEntity blockDressingEntity;
            foreach (var block in viewModel.Model.Blocks)
            {
                blockDressingEntity = await SaveEntity<BlockDressingEntity, BlockDressingModel>(block, false);
                blockDressingEntity.Dressing = dressingEntity;
            }

            //saving Stoppages
            await StoppagesSave(viewModel.MachineStoppages, viewModel.Model.MachineId);
            await OperatorsSave(viewModel.MachineOperators, viewModel.Model.MachineId);

        }

        public async Task StoppagesSave(List<MachineStoppageModel> machineStoppages, int machineId)
        {
            foreach(var stoppage in machineStoppages)
            {
                stoppage.MachineId = machineId;
                await SaveEntity<MachineStoppageEntity, MachineStoppageModel>(stoppage, false);
            }
        }

        public async Task OperatorsSave(List<MachineOperatorModel> machineOperators, int machineId)
        {
            foreach (var machineOperator in machineOperators)
            {
                machineOperator.MachineId = machineId;
                await SaveEntity<MachineOperatorEntity, MachineOperatorModel>(machineOperator, false);
            }
        }

        #endregion
    }
}
