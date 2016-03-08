using MegaMine.Core.Exception;
using MegaMine.Modules.Plant.Common;
using MegaMine.Modules.Plant.Models;
using MegaMine.Modules.Plant.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MegaMine.Modules.Plant.Domain
{
    public class PlantDomain
    {
        private PlantRepository plantRepository;
        public PlantDomain(PlantRepository plantRepository)
        {
            this.plantRepository = plantRepository;
        }

        #region Machine
        public async Task<MachineViewModel> MachinesGet()
        {
            MachineViewModel viewModel = new MachineViewModel();
            viewModel.Machines = await plantRepository.MachinesGet();
            viewModel.Blades = await plantRepository.BladeListItemGet();
            return viewModel;
        }

        public async Task MachineSave(MachineModel model)
        {
            await plantRepository.MachineSave(model);
        }
        public async Task MachineDelete(int machineId)
        {
            await plantRepository.MachineDelete(machineId);
        }
        #endregion

        #region Blade
        public async Task<List<BladeModel>> BladesGet()
        {
            return await plantRepository.BladesGet();
        }

        public async Task BladeSave(BladeModel model)
        {
            await plantRepository.BladeSave(model);
        }
        public async Task BladeDelete(int bladeId)
        {
            await plantRepository.BladeDelete(bladeId);
        }
        #endregion

        #region Operator
        public async Task<List<OperatorModel>> OperatorsGet()
        {
            return await plantRepository.OperatorsGet();
        }

        public async Task OperatorSave(OperatorModel model)
        {
            await plantRepository.OperatorSave(model);
        }
        public async Task OperatorDelete(int operatorId)
        {
            await plantRepository.OperatorDelete(operatorId);
        }
        #endregion

        #region Dressing
        public async Task<DressingViewModel> DressingGet(int? machineId, DateTime? processDate)
        {
            var viewModel = new DressingViewModel();
            if(machineId == null || processDate == null)
            {
                //returning blank model
                viewModel.Model = new DressingModel() { ProcessDate = DateTime.Now.Date, Blocks = new List<BlockDressingModel>() };
                viewModel.MachineOperators = new List<MachineOperatorModel>();
                viewModel.MachineStoppages = new List<MachineStoppageModel>();

                for(int counter = 0; counter < 2; counter++)
                {
                    //6 blank blocks
                    viewModel.Model.Blocks.Add(new BlockDressingModel());
                }
            }
            else
            {
            }

            viewModel.Machines = await plantRepository.MachineListItemGet();
            viewModel.Operators = await plantRepository.OperatorListItemGet();

            return viewModel;
        }

        public async Task DressingSave(DressingViewModel viewModel)
        {
            List<NTError> errors = new List<NTError>()
            {
                new NTError() {Description = "one" },
                new NTError() {Description = "Two" }
            };

            if(errors.Count > 0)
            {
                throw new NTException(PlantMessages.DressingError, errors);
            }
        }

        #endregion
    }
}
