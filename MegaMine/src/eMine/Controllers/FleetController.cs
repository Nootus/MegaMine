﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using eMine.Models;
using eMine.Lib.Domain;
using eMine.Lib.Shared;
using eMine.Models.Fleet;
using eMine.Lib.Entities;
using eMine.Models.Shared;
using eMine.Lib.Filters;

namespace eMine.Controllers
{
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
            return await AjaxHelper.GetAsync(m => domain.VehicleList());
        }

        [HttpGet]
        public async Task<AjaxModel<List<VehicleTypeModel>>> VehicleTypeListGet()
        {
            return await AjaxHelper.GetAsync(m => domain.VehicleTypeListGet());
        }


        [HttpGet]
        public async Task<AjaxModel<List<SparePartModel>>> SparePartListGet()
        {
            return await  AjaxHelper.GetAsync(m => domain.SparePartListGet());
        }

        
        [HttpGet]
        public async Task<AjaxModel<VehicleDetailsModel>> VehicleDetailsGet(int vehicleId)
        {
            return await AjaxHelper.GetAsync(m => domain.VehicleDetailsGet(vehicleId));
        }


        [HttpGet]
        public async Task<AjaxModel<SparePartDetailsModel>>SparePartDetailsGet(int sparePartId)
        {
            return await AjaxHelper.GetAsync(m =>domain.SparePartDetailsGet(sparePartId));
        }

        [HttpGet]
        public async Task<AjaxModel<ManufacturerDetailsModel>> ManufacturerDetailsGet(int manufacturerId)
        {
            return await AjaxHelper.GetAsync(m => domain.ManufacturerDetailsGet(manufacturerId));
        }
        
        [HttpPost]
        public async Task<AjaxModel<VehicleDetailsModel>> VehicleServiceAdd([FromBody] VehicleServiceViewModel model)
        {
            return await AjaxHelper.SaveGetAsync(m => domain.VehicleServiceSave(model), Messages.Fleet.VehicleServiceSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleDetailsModel>> VehicleServiceUpdate([FromBody] VehicleServiceViewModel model)
        {
            return await AjaxHelper.SaveGetAsync(m => domain.VehicleServiceSave(model), Messages.Fleet.VehicleServiceSaveSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<VehicleServiceViewModel>> VehicleServiceGet(int vehicleServiceId)
        {
            return await  AjaxHelper.GetAsync(m => domain.VehicleServiceGet(vehicleServiceId));
        }

        public async Task<AjaxModel<List<VehicleServiceViewModel>>> VehicleServiceReportGet(int vehicleServiceId, DateTime StartDate, DateTime EndDate)
        {
            return await AjaxHelper.GetAsync(m => domain.VehicleServiceReportGet( vehicleServiceId,  StartDate,  EndDate));
        }

        [HttpGet]
        public async Task<AjaxModel<SparePartModel>> SparePartGet(int sparePartId)
        {
            return await  AjaxHelper.GetAsync(m => domain.SparePartGet(sparePartId));
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> SparePartAdd([FromBody] SparePartModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.SparePartSave(model), Messages.Fleet.SparePartSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> SparePartUpdate([FromBody] SparePartModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.SparePartSave(model), Messages.Fleet.SparePartSaveSuccess);
        }

        [HttpGet]
        public async Task <AjaxModel<VehicleModel>> VehicleGet(int vehicleId)
        {
            return await AjaxHelper.GetAsync(m => domain.VehicleGet(vehicleId));
        }


        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> VehicleAdd([FromBody] VehicleModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.VehicleSave(model), Messages.Fleet.VehicleSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> VehicleUpdate([FromBody] VehicleModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.VehicleSave(model), Messages.Fleet.VehicleSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> ModelAdd([FromBody] VehicleManufactureModelModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.ModelSave(model), Messages.Fleet.VehicleModelSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> ModelUpdate([FromBody] VehicleManufactureModelModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.ModelSave(model), Messages.Fleet.VehicleModelSaveSuccess);
        }

        [HttpGet]
        public async Task <AjaxModel<SparePartOrderModel>> SparePartOrderGet(int sparePartOrderId)
        {
            return await AjaxHelper.GetAsync(m => domain.SparePartOrderGet(sparePartOrderId));
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> SparePartOrderAdd([FromBody] SparePartOrderModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.SparePartOrderSave(model), Messages.Fleet.SparePartOrderSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> SparePartOrderUpdate([FromBody] SparePartOrderModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.SparePartOrderSave(model), Messages.Fleet.SparePartOrderSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> VehicleTypeAdd([FromBody] VehicleTypeModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.VehicleTypeSave(model), Messages.Fleet.VehicleTypeSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> VehicleTypeUpdate([FromBody] VehicleTypeModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.VehicleTypeSave(model), Messages.Fleet.VehicleTypeSaveSuccess);
        }

        [HttpGet]
        public async Task <AjaxModel<List<VehicleDriverModel>>> DriversGet()
        {
            return await AjaxHelper.GetAsync(m => domain.DriversGet());
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> DriverAdd([FromBody] VehicleDriverModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.DriverSave(model), Messages.Fleet.DriverSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> DriverUpdate([FromBody] VehicleDriverModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.DriverSave(model), Messages.Fleet.DriverSaveSuccess);
        }

        [HttpGet]
        public async Task <AjaxModel<List<ListItem<int, string>>>> DriversListGet()
        {
            return await AjaxHelper.GetAsync(m => domain.DriversListGet());
        }

        [HttpGet]
        public async Task <AjaxModel<List<VehicleManufacturerModel>>> ManufacturersGet()
        {
            return await AjaxHelper.GetAsync(m => domain.VehicleManufacturersGet());
        }

        [HttpGet]
        public async Task <AjaxModel<VehicleManufacturerModel>> ManufacturerGet(int manufacturerId)
        {
            return await AjaxHelper.GetAsync(m => domain.VehicleManufacturerGet(manufacturerId));
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> ManufacturerAdd([FromBody] VehicleManufacturerModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.ManufacturerSave(model), Messages.Fleet.VehicleManufacturerSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> ManufacturerUpdate([FromBody] VehicleManufacturerModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.ManufacturerSave(model), Messages.Fleet.VehicleManufacturerSaveSuccess);
        }

        [HttpGet]
        public async Task <AjaxModel<List<FuelModel>>> FuelGetList(int vehicleId)
        {
            return await AjaxHelper.GetAsync(m => domain.FuelGetList(vehicleId));
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> FuelAdd([FromBody] FuelModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.FuelSave(model), Messages.Fleet.FuelSaveSuccess);
        }


        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> FuelUpdate([FromBody] FuelModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.FuelSave(model), Messages.Fleet.FuelSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> VehicleFuelReset([FromBody] int vehicleId)
        {
            return await AjaxHelper.SaveAsync(m => domain.VehicleFuelReset(vehicleId), Messages.Fleet.FuelResetSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<List<VehicleDriverAssignmentModel>>> VehicleDriverGetList(int vehicleId)
        {
            return await AjaxHelper.GetAsync(m => domain.VehicleDriverGetList(vehicleId));
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> VehicleDriverAdd([FromBody] VehicleDriverAssignmentModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.VehicleDriverSave(model), Messages.Fleet.VehicleDriverSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> VehicleDriverUpdate([FromBody] VehicleDriverAssignmentModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.VehicleDriverSave(model), Messages.Fleet.VehicleDriverSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> VehicleTripAdd([FromBody] VehicleTripModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.VehicleTripSave(model), Messages.Fleet.VehicleTripSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> VehicleTripUpdate([FromBody] VehicleTripModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.VehicleTripSave(model), Messages.Fleet.VehicleTripSaveSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<List<VehicleTripModel>>> VehicleTripListGet(int vehicleId)
        {
            return await AjaxHelper.GetAsync(m => domain.VehicleTripListGet(vehicleId));
        }

        [HttpGet]
        public async Task <AjaxModel<VehicleTripModel>> VehicleTripGet(int vehicleTripId)
        {
            return await AjaxHelper.GetAsync(m => domain.VehicleTripGet(vehicleTripId));
        }
    }
}
