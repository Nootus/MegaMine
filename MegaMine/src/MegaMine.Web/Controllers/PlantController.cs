//-------------------------------------------------------------------------------------------------
// <copyright file="PlantController.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  MVC Controller for Plant module
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MegaMine.Core.Helpers.Web;
    using MegaMine.Core.Models.Web;
    using MegaMine.Modules.Plant.Common;
    using MegaMine.Modules.Plant.Domain;
    using MegaMine.Modules.Plant.Models;
    using MegaMine.Modules.Shared.Domain;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.DependencyInjection;

    public class PlantController : Controller
    {
        private PlantDomain domain;

        public PlantController(PlantDomain domain)
        {
            this.domain = domain;
        }

        // Machine
        [HttpGet]
        public async Task<AjaxModel<MachineViewModel>> MachinesGet()
        {
            return await AjaxHelper.GetAsync(m => this.domain.MachinesGet());
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> MachineAdd([FromBody] MachineModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.MachineSave(model), PlantMessages.MachineSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> MachineUpdate([FromBody] MachineModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.MachineSave(model), PlantMessages.MachineSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> MachineDelete([FromBody] int machineId)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.MachineDelete(machineId), PlantMessages.MachineDeleteSuccess);
        }

        // Blade
        [HttpGet]
        public async Task<AjaxModel<List<BladeModel>>> BladesGet()
        {
            return await AjaxHelper.GetAsync(m => this.domain.BladesGet());
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> BladeAdd([FromBody] BladeModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.BladeSave(model), PlantMessages.BladeSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> BladeUpdate([FromBody] BladeModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.BladeSave(model), PlantMessages.BladeSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> BladeDelete([FromBody] int bladeId)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.BladeDelete(bladeId), PlantMessages.BladeDeleteSuccess);
        }

        // Operator
        [HttpGet]
        public async Task<AjaxModel<List<OperatorModel>>> OperatorsGet()
        {
            return await AjaxHelper.GetAsync(m => this.domain.OperatorsGet());
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> OperatorAdd([FromBody] OperatorModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.OperatorSave(model), PlantMessages.OperatorSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> OperatorUpdate([FromBody] OperatorModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.OperatorSave(model), PlantMessages.OperatorSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> OperatorDelete([FromBody] int operatorId)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.OperatorDelete(operatorId), PlantMessages.OperatorDeleteSuccess);
        }

        // Block Dressing
        [HttpPost]
        public async Task<AjaxModel<DressingViewModel>> DressingGet(int? machineId, DateTime? processDate)
        {
            return await AjaxHelper.GetAsync(m => this.domain.DressingGet(machineId, processDate));
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> DressingSave([FromBody] DressingViewModel viewModel)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.DressingSave(viewModel, HttpContext.RequestServices.GetRequiredService<SharedDomain>()), PlantMessages.DressingSaveSuccess);
        }
    }
}
