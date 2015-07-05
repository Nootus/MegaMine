using System;
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
            return await AjaxHelper.GetAsync<List<VehicleListModel>>(m => domain.VehicleList());
        }

        [HttpGet]
        public async Task<AjaxModel<List<VehicleTypeModel>>> VehicleTypeListGet()
        {
            return await AjaxHelper.GetAsync<List<VehicleTypeModel>>(m => domain.VehicleTypeListGet());
        }


        [HttpGet]
        public async Task<AjaxModel<List<SparePartModel>>> SparePartListGet()
        {
            return await  AjaxHelper.GetAsync<List<SparePartModel>>(m => domain.SparePartListGet());
        }

        
        [HttpGet]
        public async Task<AjaxModel<VehicleDetailsModel>> VehicleDetailsGet(int vehicleId)
        {
            return await AjaxHelper.GetAsync<VehicleDetailsModel>(m => domain.VehicleDetailsGet(vehicleId));
        }


        [HttpGet]
        public async Task<AjaxModel<SparePartDetailsModel>>SparePartDetailsGet(int sparePartId)
        {
            return await AjaxHelper.GetAsync<SparePartDetailsModel>(m =>domain.SparePartDetailsGet(sparePartId));
        }

        [HttpGet]
        public async Task<AjaxModel<ManufacturerDetailsModel>> ManufacturerDetailsGet(int manufacturerId)
        {
            return await AjaxHelper.GetAsync<ManufacturerDetailsModel>(m => domain.ManufacturerDetailsGet(manufacturerId));
        }
        
        [HttpPost]
        public async Task<AjaxModel<VehicleDetailsModel>> VehicleServiceSave([FromBody] VehicleServiceViewModel model)
        {
          return await AjaxHelper.SaveGetAsync<VehicleDetailsModel>(m => domain.VehicleServiceSave(model), Messages.Fleet.VehicleServiceSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleDetailsModel>> VehicleServiceAdd([FromBody] VehicleServiceViewModel model)
        {
            return await AjaxHelper.SaveGetAsync<VehicleDetailsModel>(m => domain.VehicleServiceSave(model), Messages.Fleet.VehicleServiceSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleDetailsModel>> VehicleServiceUpdate([FromBody] VehicleServiceViewModel model)
        {
            return await AjaxHelper.SaveGetAsync<VehicleDetailsModel>(m => domain.VehicleServiceSave(model), Messages.Fleet.VehicleServiceSaveSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<VehicleServiceViewModel>> VehicleServiceGet(int vehicleServiceId)
        {
            return await  AjaxHelper.GetAsync<VehicleServiceViewModel>(m => domain.VehicleServiceGet(vehicleServiceId));
        }

        public async Task<AjaxModel<List<VehicleServiceViewModel>>> VehicleServiceReportGet(int vehicleServiceId, DateTime StartDate, DateTime EndDate)
        {
            return await AjaxHelper.GetAsync<List<VehicleServiceViewModel>>(m => domain.VehicleServiceReportGet( vehicleServiceId,  StartDate,  EndDate));
        }

        [HttpGet]
        public async Task<AjaxModel<SparePartModel>> SparePartGet(int sparePartId)
        {
            return await  AjaxHelper.GetAsync<SparePartModel>(m => domain.SparePartGet(sparePartId));
        }

        [HttpPost]
        public async Task <AjaxModel<SparePartModel>> SparePartSave([FromBody] SparePartModel model)
        {
            return await AjaxHelper.SaveAsync<SparePartModel>(m => domain.SparePartSave(model), Messages.Fleet.SparePartSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<SparePartModel>> SparePartAdd([FromBody] SparePartModel model)
        {
            return await AjaxHelper.SaveAsync<SparePartModel>(m => domain.SparePartSave(model), Messages.Fleet.SparePartSaveSuccess);
        }
          [HttpPost]
        public async Task<AjaxModel<SparePartModel>> SparePartUpdate([FromBody] SparePartModel model)
        {
            return await AjaxHelper.SaveAsync<SparePartModel>(m => domain.SparePartSave(model), Messages.Fleet.SparePartSaveSuccess);
        }

        [HttpGet]
        public async Task <AjaxModel<VehicleModel>> VehicleGet(int vehicleId)
        {
            return await AjaxHelper.GetAsync<VehicleModel>(m => domain.VehicleGet(vehicleId));
        }


        [HttpPost]
        public async Task<AjaxModel<VehicleModel>> ResetVehicleFuel([FromBody] int vehicleId)
        {
            return await AjaxHelper.SaveAsync<VehicleModel>(m => domain.ResetVehicleFuel(vehicleId), Messages.Fleet.VehicleTypeSaveSuccess);
        }


        [HttpPost]
        public async Task <AjaxModel<VehicleModel>> VehicleSave([FromBody] VehicleModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleModel>(m => domain.VehicleSave(model), Messages.Fleet.VehicleSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleModel>> VehicleAdd([FromBody] VehicleModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleModel>(m => domain.VehicleSave(model), Messages.Fleet.VehicleSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleModel>> VehicleUpdate([FromBody] VehicleModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleModel>(m => domain.VehicleSave(model), Messages.Fleet.VehicleSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleManufactureModelModel>> ModelSave([FromBody] VehicleManufactureModelModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleManufactureModelModel>(m => domain.ModelSave(model), Messages.Fleet.VehicleModelSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleManufactureModelModel>> ModelAdd([FromBody] VehicleManufactureModelModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleManufactureModelModel>(m => domain.ModelSave(model), Messages.Fleet.VehicleModelSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleManufactureModelModel>> ModelUpdate([FromBody] VehicleManufactureModelModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleManufactureModelModel>(m => domain.ModelSave(model), Messages.Fleet.VehicleModelSaveSuccess);
        }


        [HttpGet]
        public async Task <AjaxModel<SparePartOrderModel>> SparePartOrderGet(int sparePartOrderId)
        {
            return await AjaxHelper.GetAsync<SparePartOrderModel>(m => domain.SparePartOrderGet(sparePartOrderId));
        }

        [HttpPost]
        public async  Task<AjaxModel<SparePartOrderModel>> SparePartOrderSave([FromBody] SparePartOrderModel model)
        {
            return await  AjaxHelper.SaveAsync<SparePartOrderModel>(m => domain.SparePartOrderSave(model), Messages.Fleet.SparePartOrderSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<SparePartOrderModel>> SparePartOrderAdd([FromBody] SparePartOrderModel model)
        {
            return await AjaxHelper.SaveAsync<SparePartOrderModel>(m => domain.SparePartOrderSave(model), Messages.Fleet.SparePartOrderSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<SparePartOrderModel>> SparePartOrderUpdate([FromBody] SparePartOrderModel model)
        {
            return await AjaxHelper.SaveAsync<SparePartOrderModel>(m => domain.SparePartOrderSave(model), Messages.Fleet.SparePartOrderSaveSuccess);
        }


        [HttpPost]
        public async Task<AjaxModel<VehicleTypeModel>> VehicleTypeSave([FromBody] VehicleTypeModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleTypeModel>(m => domain.VehicleTypeSave(model), Messages.Fleet.VehicleTypeSaveSuccess);
        }


        [HttpPost]
        public async Task<AjaxModel<VehicleTypeModel>> VehicleTypeAdd([FromBody] VehicleTypeModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleTypeModel>(m => domain.VehicleTypeSave(model), Messages.Fleet.VehicleTypeSaveSuccess);
        }


        [HttpPost]
        public async Task<AjaxModel<VehicleTypeModel>> VehicleTypeUpdate([FromBody] VehicleTypeModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleTypeModel>(m => domain.VehicleTypeSave(model), Messages.Fleet.VehicleTypeSaveSuccess);
        }

        [HttpGet]
        public async Task <AjaxModel<List<VehicleDriverModel>>> DriversGet()
        {
            return await AjaxHelper.GetAsync<List<VehicleDriverModel>>(m => domain.DriversGet());
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleDriverModel>> DriverSaveAsync([FromBody] VehicleDriverModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleDriverModel>(m => domain.DriverSave(model), Messages.Fleet.DriverSaveSuccess);
        }

        [HttpGet]
        public async Task <AjaxModel<List<ListItem<int, string>>>> DriversListGet()
        {
            return await AjaxHelper.GetAsync<List<ListItem<int, string>>>(m => domain.DriversListGet());
        }


        [HttpGet]
        public async Task <AjaxModel<List<VehicleManufacturerModel>>> ManufacturersGet()
        {
            return await AjaxHelper.GetAsync<List<VehicleManufacturerModel>>(m => domain.VehicleManufacturersGet());
        }

        [HttpGet]
        public async Task <AjaxModel<VehicleManufacturerModel>> ManufacturerGet(int manufacturerId)
        {
            return await AjaxHelper.GetAsync<VehicleManufacturerModel>(m => domain.VehicleManufacturerGet(manufacturerId));
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleTypeModel>> ManufacturerSave([FromBody] VehicleManufacturerModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleTypeModel>(m => domain.ManufacturerSave(model), Messages.Fleet.VehicleManufacturerSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleTypeModel>> ManufacturerAdd([FromBody] VehicleManufacturerModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleTypeModel>(m => domain.ManufacturerSave(model), Messages.Fleet.VehicleManufacturerSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleTypeModel>> ManufacturerUpdate([FromBody] VehicleManufacturerModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleTypeModel>(m => domain.ManufacturerSave(model), Messages.Fleet.VehicleManufacturerSaveSuccess);
        }

        [HttpGet]
        public async Task <AjaxModel<List<FuelModel>>> FuelGetList(int vehicleId)
        {
            return await AjaxHelper.GetAsync<List<FuelModel>>(m => domain.FuelGetList(vehicleId));
        }

        [HttpPost]
        public async Task<AjaxModel<FuelModel>> FuelSave([FromBody] FuelModel model)
        {
            return await AjaxHelper.SaveAsync<FuelModel>(m => domain.FuelSave(model), Messages.Fleet.FuelSaveSuccess);
        }


        [HttpPost]
        public async Task<AjaxModel<FuelModel>> FuelAdd([FromBody] FuelModel model)
        {
            return await AjaxHelper.SaveAsync<FuelModel>(m => domain.FuelSave(model), Messages.Fleet.FuelSaveSuccess);
        }


        [HttpPost]
        public async Task<AjaxModel<FuelModel>> FuelUpdate([FromBody] FuelModel model)
        {
            return await AjaxHelper.SaveAsync<FuelModel>(m => domain.FuelSave(model), Messages.Fleet.FuelSaveSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<List<VehicleDriverAssignmentModel>>> VehicleDriverGetList(int vehicleId)
        {
            return await AjaxHelper.GetAsync<List<VehicleDriverAssignmentModel>>(m => domain.VehicleDriverGetList(vehicleId));
        }


        [HttpPost]
        public async Task<AjaxModel<VehicleDriverAssignmentModel>> VehicleDriverSave([FromBody] VehicleDriverAssignmentModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleDriverAssignmentModel>(m => domain.VehicleDriverSave(model), Messages.Fleet.VehicleDriverSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleDriverAssignmentModel>> VehicleDriverAdd([FromBody] VehicleDriverAssignmentModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleDriverAssignmentModel>(m => domain.VehicleDriverSave(model), Messages.Fleet.VehicleDriverSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleDriverAssignmentModel>> VehicleDriverUpdate([FromBody] VehicleDriverAssignmentModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleDriverAssignmentModel>(m => domain.VehicleDriverSave(model), Messages.Fleet.VehicleDriverSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleTripModel>> VehicleTripSave([FromBody] VehicleTripModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleTripModel>(m => domain.VehicleTripSave(model), Messages.Fleet.VehicleTripSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleTripModel>> VehicleTripAdd([FromBody] VehicleTripModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleTripModel>(m => domain.VehicleTripSave(model), Messages.Fleet.VehicleTripSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleTripModel>> VehicleTripUpdate([FromBody] VehicleTripModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleTripModel>(m => domain.VehicleTripSave(model), Messages.Fleet.VehicleTripSaveSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<List<VehicleTripModel>>> VehicleTripListGet(int vehicleTripId)
        {
            return await AjaxHelper.GetAsync<List<VehicleTripModel>>(m => domain.VehicleTripListGet(vehicleTripId));
        }

        [HttpGet]
        public async Task <AjaxModel<VehicleTripModel>> VehicleTripGet(int vehicleTripId)
        {
            return await AjaxHelper.GetAsync<VehicleTripModel>(m => domain.VehicleTripGet(vehicleTripId));
        }
                
        [HttpGet]
        public async Task<AjaxModel<string>> Test()
        {
            AjaxModel<string> ajax = null;
            try
            {
              var v = SparePartOrderGet(1);
                
            
            }
            catch
            {

            }

            return   ajax;

        }

    }
}
