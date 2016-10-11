//-------------------------------------------------------------------------------------------------
// <copyright file="FleetController.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Controller for the Fleet views
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MegaMine.Core.Helpers.Web;
    using MegaMine.Core.Models;
    using MegaMine.Core.Models.Web;
    using MegaMine.Modules.Fleet.Domain;
    using MegaMine.Modules.Fleet.Models;
    using MegaMine.Modules.Fleet.Shared;
    using Microsoft.AspNetCore.Mvc;
    using Services.Widget.Domain;

    public class FleetController : Controller
    {
        private FleetDomain domain;
        private FleetDashboardDomain dashboardDomain;
        private WidgetDomain widgetDomain;

        public FleetController(FleetDomain domain, FleetDashboardDomain dashboardDomain, WidgetDomain widgetDomain)
        {
            this.domain = domain;
            this.dashboardDomain = dashboardDomain;
            this.widgetDomain = widgetDomain;
        }

        // Vehicle Type
        [HttpGet]
        public async Task<AjaxModel<List<VehicleTypeModel>>> VehicleTypesGet()
        {
            return await AjaxHelper.GetDashboardAsync(m => this.domain.VehicleTypesGet(), this.dashboardDomain, this.widgetDomain);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleTypeAdd([FromBody] VehicleTypeModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleTypeSave(model), FleetMessages.VehicleTypeSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleTypeUpdate([FromBody] VehicleTypeModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleTypeSave(model), FleetMessages.VehicleTypeSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleTypeDelete([FromBody] int vehicleTypeId)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleTypeDelete(vehicleTypeId), FleetMessages.VehicleTypeDeleteSuccess);
        }

        // Vehicle
        [HttpGet]
        public async Task<AjaxModel<List<VehicleListModel>>> VehicleList()
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleList());
        }

        [HttpGet]
        public async Task<AjaxModel<VehicleDetailsModel>> VehicleDetailsGet(int vehicleId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleDetailsGet(vehicleId));
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleDetailsModel>> VehicleServiceAdd([FromBody] VehicleServiceModel model)
        {
            return await AjaxHelper.SaveGetAsync(m => this.domain.VehicleServiceSave(model), FleetMessages.VehicleServiceSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleDetailsModel>> VehicleServiceUpdate([FromBody] VehicleServiceModel model)
        {
            return await AjaxHelper.SaveGetAsync(m => this.domain.VehicleServiceSave(model), FleetMessages.VehicleServiceSaveSuccess);
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
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleSave(model), FleetMessages.VehicleSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleUpdate([FromBody] VehicleModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleSave(model), FleetMessages.VehicleSaveSuccess);
        }

        // Manufacturer
        [HttpGet]
        public async Task<AjaxModel<List<VehicleManufacturerModel>>> ManufacturersGet()
        {
            return await AjaxHelper.GetDashboardAsync(m => this.domain.VehicleManufacturersGet(), this.dashboardDomain, this.widgetDomain);
        }

        [HttpGet]
        public async Task<AjaxModel<VehicleManufacturerModel>> ManufacturerGet(int manufacturerId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleManufacturerGet(manufacturerId));
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ManufacturerAdd([FromBody] VehicleManufacturerModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.ManufacturerSave(model), FleetMessages.VehicleManufacturerSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ManufacturerUpdate([FromBody] VehicleManufacturerModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.ManufacturerSave(model), FleetMessages.VehicleManufacturerSaveSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<ManufacturerDetailsModel>> ManufacturerDetailsGet(int manufacturerId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.ManufacturerDetailsGet(manufacturerId));
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ModelAdd([FromBody] VehicleManufactureModelModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.ModelSave(model), FleetMessages.VehicleModelSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ModelUpdate([FromBody] VehicleManufactureModelModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.ModelSave(model), FleetMessages.VehicleModelSaveSuccess);
        }

        // Driver
        [HttpGet]
        public async Task<AjaxModel<List<VehicleDriverModel>>> DriversGet()
        {
            return await AjaxHelper.GetDashboardAsync(m => this.domain.DriversGet(), this.dashboardDomain, this.widgetDomain);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> DriverAdd([FromBody] VehicleDriverModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.DriverSave(model), FleetMessages.DriverSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> DriverUpdate([FromBody] VehicleDriverModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.DriverSave(model), FleetMessages.DriverSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> DriverDelete([FromBody] int vehicleDriverId)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.DriverDelete(vehicleDriverId), FleetMessages.DriverDeleteSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<List<ListItem<int, string>>>> DriversListGet()
        {
            return await AjaxHelper.GetAsync(m => this.domain.DriversListGet());
        }

        [HttpGet]
        public async Task<AjaxModel<List<VehicleDriverAssignmentModel>>> VehicleDriverGetList(int vehicleId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleDriverGetList(vehicleId));
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleDriverAdd([FromBody] VehicleDriverAssignmentModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleDriverSave(model), FleetMessages.VehicleDriverSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleDriverUpdate([FromBody] VehicleDriverAssignmentModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleDriverSave(model), FleetMessages.VehicleDriverSaveSuccess);
        }

        // Fuel
        [HttpGet]
        public async Task<AjaxModel<List<FuelModel>>> FuelGetList(int vehicleId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.FuelGetList(vehicleId));
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> FuelAdd([FromBody] FuelModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.FuelSave(model), FleetMessages.FuelSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> FuelUpdate([FromBody] FuelModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.FuelSave(model), FleetMessages.FuelSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleFuelReset([FromBody] int vehicleId)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleFuelReset(vehicleId), FleetMessages.FuelResetSuccess);
        }

        // Trip
        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleTripAdd([FromBody] VehicleTripModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleTripSave(model), FleetMessages.VehicleTripSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> VehicleTripUpdate([FromBody] VehicleTripModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.VehicleTripSave(model), FleetMessages.VehicleTripSaveSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<List<VehicleTripModel>>> VehicleTripListGet(int vehicleId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.VehicleTripListGet(vehicleId));
        }
    }
}
