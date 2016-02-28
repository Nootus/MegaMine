using MegaMine.Modules.Plant.Common;
using MegaMine.Modules.Plant.Domain;
using MegaMine.Modules.Plant.Models;
using MegaMine.Web.Lib.Shared;
using MegaMine.Web.Models.Shared;
using Microsoft.AspNet.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MegaMine.Web.Controllers
{
    public class PlantController
    {
        private PlantDomain domain;
        public PlantController(PlantDomain domain)
        {
            this.domain = domain;
        }

        #region Machine
        [HttpGet]
        public async Task<AjaxModel<List<MachineModel>>> MachinesGet()
        {
            return await AjaxHelper.GetAsync(m => domain.MachinesGet());
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> MachineAdd([FromBody] MachineModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.MachineSave(model), PlantMessages.MachineSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> MachineUpdate([FromBody] MachineModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.MachineSave(model), PlantMessages.MachineSaveSuccess);
        }
        [HttpPost]
        public async Task<AjaxModel<NTModel>> MachineDelete([FromBody] int machineId)
        {
            return await AjaxHelper.SaveAsync(m => domain.MachineDelete(machineId), PlantMessages.MachineDeleteSuccess);
        }
        #endregion

        #region Blade
        [HttpGet]
        public async Task<AjaxModel<List<BladeModel>>> BladesGet()
        {
            return await AjaxHelper.GetAsync(m => domain.BladesGet());
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> BladeAdd([FromBody] BladeModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.BladeSave(model), PlantMessages.BladeSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> BladeUpdate([FromBody] BladeModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.BladeSave(model), PlantMessages.BladeSaveSuccess);
        }
        [HttpPost]
        public async Task<AjaxModel<NTModel>> BladeDelete([FromBody] int bladeId)
        {
            return await AjaxHelper.SaveAsync(m => domain.BladeDelete(bladeId), PlantMessages.BladeDeleteSuccess);
        }
        #endregion

        #region Operator
        [HttpGet]
        public async Task<AjaxModel<List<OperatorModel>>> OperatorsGet()
        {
            return await AjaxHelper.GetAsync(m => domain.OperatorsGet());
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> OperatorAdd([FromBody] OperatorModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.OperatorSave(model), PlantMessages.OperatorSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> OperatorUpdate([FromBody] OperatorModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.OperatorSave(model), PlantMessages.OperatorSaveSuccess);
        }
        [HttpPost]
        public async Task<AjaxModel<NTModel>> OperatorDelete([FromBody] int operatorId)
        {
            return await AjaxHelper.SaveAsync(m => domain.OperatorDelete(operatorId), PlantMessages.OperatorDeleteSuccess);
        }
        #endregion
    }
}
