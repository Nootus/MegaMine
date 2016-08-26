//-------------------------------------------------------------------------------------------------
// <copyright file="PlantDomain.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Business logic or passthrough repository for Plant module
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Plant.Domain
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using MegaMine.Core.Exception;
    using MegaMine.Core.Helpers;
    using MegaMine.Modules.Plant.Common;
    using MegaMine.Modules.Plant.Models;
    using MegaMine.Modules.Plant.Repositories;
    using MegaMine.Modules.Shared.Domain;
    using MegaMine.Modules.Shared.Models;

    public class PlantDomain
    {
        private PlantRepository plantRepository;

        public PlantDomain(PlantRepository plantRepository)
        {
            this.plantRepository = plantRepository;
        }

        // Machine
        public async Task<MachineViewModel> MachinesGet()
        {
            MachineViewModel viewModel = new MachineViewModel();
            viewModel.Machines = await this.plantRepository.MachinesGet();
            viewModel.Blades = await this.plantRepository.BladeListItemGet();
            return viewModel;
        }

        public async Task MachineSave(MachineModel model)
        {
            await this.plantRepository.MachineSave(model);
        }

        public async Task MachineDelete(int machineId)
        {
            await this.plantRepository.MachineDelete(machineId);
        }

        // Blade
        public async Task<List<BladeModel>> BladesGet()
        {
            return await this.plantRepository.BladesGet();
        }

        public async Task BladeSave(BladeModel model)
        {
            await this.plantRepository.BladeSave(model);
        }

        public async Task BladeDelete(int bladeId)
        {
            await this.plantRepository.BladeDelete(bladeId);
        }

        // Operator
        public async Task<List<OperatorModel>> OperatorsGet()
        {
            return await this.plantRepository.OperatorsGet();
        }

        public async Task OperatorSave(OperatorModel model)
        {
            await this.plantRepository.OperatorSave(model);
        }

        public async Task OperatorDelete(int operatorId)
        {
            await this.plantRepository.OperatorDelete(operatorId);
        }

        // Dressing
        public async Task<DressingViewModel> DressingGet(int? machineId, DateTime? processDate)
        {
            DressingViewModel viewModel = new DressingViewModel();
            if (machineId == null || processDate == null)
            {
                // returning blank model
                viewModel.Model = new DressingModel() { ProcessDate = DateTime.Now.Date, Blocks = new List<BlockDressingModel>() };
                viewModel.MachineOperators = new List<MachineOperatorModel>();
                viewModel.MachineStoppages = new List<MachineStoppageModel>();

                for (int counter = 0; counter < 2; counter++)
                {
                    // 6 blank blocks
                    viewModel.Model.Blocks.Add(new BlockDressingModel());
                }
            }

            viewModel.Machines = await this.plantRepository.MachineListItemGet();
            viewModel.Operators = await this.plantRepository.OperatorListItemGet();

            return viewModel;
        }

        public async Task DressingSave(DressingViewModel viewModel, SharedDomain sharedDomain)
        {
            List<NTError> errors = new List<NTError>();

            // validating BlockNumbers
            string[] blockNumbers = viewModel.Model.Blocks.Select(m => m.BlockNumber).ToArray();
            List<BlockStateModel> blockStates = await sharedDomain.BlockStatesGet(blockNumbers);

            string[] invalidBlockNumbers = blockNumbers.Except(blockStates.Where(b => b.State == (int)State.Excavate).Select(b => b.BlockNumber)).ToArray();
            if (invalidBlockNumbers.Length > 0)
            {
                errors.Add(new NTError() { Description = string.Format(PlantMessages.BlockNumbersInvalid, string.Join(", ", invalidBlockNumbers)) });
            }

            // validating time for Stoppages
            if (!viewModel.MachineStoppages.ValidateTimeRange())
            {
                errors.Add(new NTError() { Description = PlantMessages.StoppageTimeRangeInvalid });
            }

            // checking for one operator
            if (viewModel.MachineOperators.Count == 0)
            {
                errors.Add(new NTError() { Description = PlantMessages.OperatorRequired });
            }
            else if (!viewModel.MachineOperators.ValidateTimeRange())
            {
                errors.Add(new NTError() { Description = PlantMessages.OperatorTimeRangeInvalid });
            }

            if (errors.Count > 0)
            {
                throw new NTException(PlantMessages.DressingError, errors);
            }

            // saving the Block Dressing
            await this.plantRepository.DressingSave(viewModel);

            // finally saving the state info
            foreach (var state in blockStates)
            {
                state.State = (int)State.Dress;
            }

            await sharedDomain.BlockStatesSave(blockStates);
        }
    }
}
