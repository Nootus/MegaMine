//-------------------------------------------------------------------------------------------------
// <copyright file="FleetController.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Controller for the Fleet views
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Web.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MegaMine.Core.Helpers.Web;
    using MegaMine.Core.Models;
    using MegaMine.Core.Models.Web;
    using MegaMine.Web.Lib.Domain;
    using MegaMine.Web.Lib.Shared;
    using MegaMine.Web.Models.Fleet;
    using Microsoft.AspNetCore.Mvc;

    public class FleetController : Controller
    {
        private FleetDomain domain;

        public FleetController(FleetDomain domain)
        {
            this.domain = domain;
        }

        [HttpGet]
        public async Task<AjaxModel<List<VehicleListModel>>> VehicleList()
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleList());
        }

        [HttpGet]
        public async Task<AjaxModel<List<VehicleTypeModel>>> VehicleTypeListGet()
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleTypeListGet());
        }

        [HttpGet]
        public async Task<AjaxModel<VehicleDetailsModel>> VehicleDetailsGet(int vehicleId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleDetailsGet(vehicleId));
        }

        [HttpGet]
        public async Task<AjaxModel<ManufacturerDetailsModel>> ManufacturerDetailsGet(int manufacturerId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.ManufacturerDetailsGet(manufacturerId));
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleDetailsModel>> VehicleServiceAdd([FromBody] VehicleServiceModel model)
        {
            return await AjaxHelper.SaveGetAsync(m => this.domain.VehicleServiceSave(model), Messages.Fleet.VehicleServiceSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleDetailsModel>> VehicleServiceUpdate([FromBody] VehicleServiceModel model)
        {
            return await AjaxHelper.SaveGetAsync(m => this.domain.VehicleServiceSave(model), Messages.Fleet.VehicleServiceSaveSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<VehicleServiceModel>> VehicleServiceGet(int vehicleServiceId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleServiceGet(vehicleServiceId));
        }

        public async Task<AjaxModel<List<VehicleServiceModel>>> VehicleServiceReportGet(int vehicleServiceId, DateTime startDate, DateTime endDate)
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleServiceReportGet(vehicleServiceId, startDate, endDate));
        }

        [HttpGet]
        public async Task<AjaxModel<VehicleModel>> VehicleGet(int vehicleId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleGet(vehicleId));
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleAdd([FromBody] VehicleModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleSave(model), Messages.Fleet.VehicleSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleUpdate([FromBody] VehicleModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleSave(model), Messages.Fleet.VehicleSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ModelAdd([FromBody] VehicleManufactureModelModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.ModelSave(model), Messages.Fleet.VehicleModelSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ModelUpdate([FromBody] VehicleManufactureModelModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.ModelSave(model), Messages.Fleet.VehicleModelSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleTypeAdd([FromBody] VehicleTypeModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleTypeSave(model), Messages.Fleet.VehicleTypeSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleTypeUpdate([FromBody] VehicleTypeModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleTypeSave(model), Messages.Fleet.VehicleTypeSaveSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<List<VehicleDriverModel>>> DriversGet()
        {
            return await AjaxHelper.GetAsync(m => this.domain.DriversGet());
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> DriverAdd([FromBody] VehicleDriverModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.DriverSave(model), Messages.Fleet.DriverSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> DriverUpdate([FromBody] VehicleDriverModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.DriverSave(model), Messages.Fleet.DriverSaveSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<List<ListItem<int, string>>>> DriversListGet()
        {
            return await AjaxHelper.GetAsync(m => this.domain.DriversListGet());
        }

        [HttpGet]
        public async Task<AjaxModel<List<VehicleManufacturerModel>>> ManufacturersGet()
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleManufacturersGet());
        }

        [HttpGet]
        public async Task<AjaxModel<VehicleManufacturerModel>> ManufacturerGet(int manufacturerId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleManufacturerGet(manufacturerId));
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ManufacturerAdd([FromBody] VehicleManufacturerModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.ManufacturerSave(model), Messages.Fleet.VehicleManufacturerSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ManufacturerUpdate([FromBody] VehicleManufacturerModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.ManufacturerSave(model), Messages.Fleet.VehicleManufacturerSaveSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<List<FuelModel>>> FuelGetList(int vehicleId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.FuelGetList(vehicleId));
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> FuelAdd([FromBody] FuelModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.FuelSave(model), Messages.Fleet.FuelSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> FuelUpdate([FromBody] FuelModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.FuelSave(model), Messages.Fleet.FuelSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleFuelReset([FromBody] int vehicleId)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleFuelReset(vehicleId), Messages.Fleet.FuelResetSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<List<VehicleDriverAssignmentModel>>> VehicleDriverGetList(int vehicleId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleDriverGetList(vehicleId));
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleDriverAdd([FromBody] VehicleDriverAssignmentModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleDriverSave(model), Messages.Fleet.VehicleDriverSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleDriverUpdate([FromBody] VehicleDriverAssignmentModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleDriverSave(model), Messages.Fleet.VehicleDriverSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleTripAdd([FromBody] VehicleTripModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleTripSave(model), Messages.Fleet.VehicleTripSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleTripUpdate([FromBody] VehicleTripModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleTripSave(model), Messages.Fleet.VehicleTripSaveSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<List<VehicleTripModel>>> VehicleTripListGet(int vehicleId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleTripListGet(vehicleId));
        }

/*
        //[HttpGet]
        //public async Task<AjaxModel<List<SparePartModel>>> SparePartListGet()
        //{
        //    return await  AjaxHelper.GetAsync(m => this.domain.SparePartListGet());
        //}

        //[HttpGet]
        //public async Task<AjaxModel<SparePartDetailsModel>>SparePartDetailsGet(int sparePartId)
        //{
        //    return await AjaxHelper.GetAsync(m =>domain.SparePartDetailsGet(sparePartId));
        //}

        //[HttpGet]
        //public async Task<AjaxModel<SparePartModel>> SparePartGet(int sparePartId)
        //{
        //    return await  AjaxHelper.GetAsync(m => this.domain.SparePartGet(sparePartId));
        //}

        //[HttpPost]
        //public async Task<AjaxModel<NTModel>> SparePartAdd([FromBody] SparePartModel model)
        //{
        //    return await AjaxHelper.SaveAsync(m => this.domain.SparePartSave(model), Messages.Fleet.SparePartSaveSuccess);
        //}

        //[HttpPost]
        //public async Task<AjaxModel<NTModel>> SparePartUpdate([FromBody] SparePartModel model)
        //{
        //    return await AjaxHelper.SaveAsync(m => this.domain.SparePartSave(model), Messages.Fleet.SparePartSaveSuccess);
        //}

        //[HttpGet]
        //public async Task<AjaxModel<SparePartOrderModel>> SparePartOrderGet(int sparePartOrderId)
        //{
        //    return await AjaxHelper.GetAsync(m => this.domain.SparePartOrderGet(sparePartOrderId));
        //}

        //[HttpPost]
        //public async Task<AjaxModel<NTModel>> SparePartOrderAdd([FromBody] SparePartOrderModel model)
        //{
        //    return await AjaxHelper.SaveAsync(m => this.domain.SparePartOrderSave(model), Messages.Fleet.SparePartOrderSaveSuccess);
        //}

        //[HttpPost]
        //public async Task<AjaxModel<NTModel>> SparePartOrderUpdate([FromBody] SparePartOrderModel model)
        //{
        //    return await AjaxHelper.SaveAsync(m => this.domain.SparePartOrderSave(model), Messages.Fleet.SparePartOrderSaveSuccess);
        //}
 */
    }
}
