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

        #region Material Colour
        [HttpGet]
        public async Task<AjaxModel<List<MachineModel>>> MachinesGet()
        {
            return await AjaxHelper.GetAsync(m => domain.MachinesGet());
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> MaterialColourAdd([FromBody] MachineModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.MachineSave(model), PlantMessages.MachineSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> MaterialColourUpdate([FromBody] MachineModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.MachineSave(model), PlantMessages.MachineSaveSuccess);
        }
        [HttpPost]
        public async Task<AjaxModel<NTModel>> MaterialColourDelete([FromBody] int machineId)
        {
            return await AjaxHelper.SaveAsync(m => domain.MachineDelete(machineId), PlantMessages.MachineDeleteSuccess);
        }
        #endregion
    }
}
