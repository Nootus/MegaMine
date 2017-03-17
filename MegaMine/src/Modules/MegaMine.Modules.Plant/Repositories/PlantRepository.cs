//-------------------------------------------------------------------------------------------------
// <copyright file="PlantRepository.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Plant related DB Operations
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Repositories
{
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using MegaMine.Core.Models;
    using MegaMine.Core.Repositories;
    using MegaMine.Modules.Plant.Entities;
    using MegaMine.Modules.Plant.Models;
    using Microsoft.EntityFrameworkCore;

    public class PlantRepository : BaseRepository<PlantDbContext>
    {
        public PlantRepository(PlantDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        // Machine
        public async Task<List<ListItem<int, string>>> MachineListItemGet()
        {
            return await this.GetListItemsAsync<MachineEntity>(e => new ListItem<int, string> { Key = e.MachineId, Item = e.Name }, s => s.Name);
        }

        public async Task<List<MachineModel>> MachinesGet()
        {
            var query = from mac in this.DbContext.Machines
                        join bld in this.DbContext.Blades on mac.BladeId equals bld.BladeId
                        where mac.CompanyId == this.AppContext.CompanyId
                        && mac.DeletedInd == false
                        select new MachineModel()
                        {
                            MachineId = mac.MachineId,
                            Name = mac.Name,
                            BladeId = mac.BladeId,
                            BladeName = bld.Name,
                            Description = mac.Description,
                        };

            return await query.ToListAsync();
        }

        public async Task MachineSave(MachineModel model)
        {
            await this.SaveEntity<MachineEntity, MachineModel>(model);
        }

        public async Task MachineDelete(int machineId)
        {
            await this.DeleteEntity<MachineEntity>(machineId);
        }

        // Blade
        public async Task<List<ListItem<int, string>>> BladeListItemGet()
        {
            return await this.GetListItemsAsync<BladeEntity>(e => new ListItem<int, string> { Key = e.BladeId, Item = e.Name }, s => s.Name);
        }

        public async Task<List<BladeModel>> BladesGet()
        {
            return await this.GetListAsync<BladeEntity, BladeModel>(s => s.Name);
        }

        public async Task BladeSave(BladeModel model)
        {
            await this.SaveEntity<BladeEntity, BladeModel>(model);
        }

        public async Task BladeDelete(int bladeId)
        {
            await this.DeleteEntity<BladeEntity>(bladeId);
        }

        // Operator
        public async Task<List<ListItem<int, string>>> OperatorListItemGet()
        {
            return await this.GetListItemsAsync<OperatorEntity>(e => new ListItem<int, string> { Key = e.OperatorId, Item = e.Name }, s => s.Name);
        }

        public async Task<List<OperatorModel>> OperatorsGet()
        {
            return await this.GetListAsync<OperatorEntity, OperatorModel>(s => s.Name);
        }

        public async Task OperatorSave(OperatorModel model)
        {
            await this.SaveEntity<OperatorEntity, OperatorModel>(model);
        }

        public async Task OperatorDelete(int operatorId)
        {
            await this.DeleteEntity<OperatorEntity>(operatorId);
        }

        // Dressing
        public async Task DressingSave(DressingViewModel viewModel)
        {
            await this.DbContext.Database.BeginTransactionAsync();

            // Saving Dressing Model
            DressingEntity dressingEntity = await this.SaveEntity<DressingEntity, DressingModel>(viewModel.Model, false);
            BlockDressingEntity blockDressingEntity;
            foreach (var block in viewModel.Model.Blocks)
            {
                blockDressingEntity = await this.SaveEntity<BlockDressingEntity, BlockDressingModel>(block, false);
                blockDressingEntity.Dressing = dressingEntity;
            }

            // saving Stoppages & Operators
            await this.StoppagesSave(viewModel.MachineStoppages, viewModel.Model.MachineId);
            await this.OperatorsSave(viewModel.MachineOperators, viewModel.Model.MachineId);
        }

        public async Task StoppagesSave(List<MachineStoppageModel> machineStoppages, int machineId)
        {
            foreach (var stoppage in machineStoppages)
            {
                stoppage.MachineId = machineId;
                await this.SaveEntity<MachineStoppageEntity, MachineStoppageModel>(stoppage, false);
            }
        }

        public async Task OperatorsSave(List<MachineOperatorModel> machineOperators, int machineId)
        {
            foreach (var machineOperator in machineOperators)
            {
                machineOperator.MachineId = machineId;
                await this.SaveEntity<MachineOperatorEntity, MachineOperatorModel>(machineOperator, false);
            }
        }
    }
}
