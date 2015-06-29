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
        public AjaxModel<List<SparePartModel>> SparePartListGet()
        {
            return AjaxHelper.Get<List<SparePartModel>>(m => domain.SparePartListGet());
        }

        
        [HttpGet]
        public Task<AjaxModel<VehicleDetailsModel>> VehicleDetailsGet(int vehicleId)
        {
            return AjaxHelper.GetAsync<VehicleDetailsModel>(m => domain.VehicleDetailsGet(vehicleId));
        }


        [HttpGet]
        public AjaxModel<SparePartDetailsModel> SparePartDetailsGet(int sparePartId)
        {
            return AjaxHelper.Get<SparePartDetailsModel>(m => domain.SparePartDetailsGet(sparePartId));
        }

        [HttpGet]
        public AjaxModel<ManufacturerDetailsModel> ManufacturerDetailsGet(int manufacturerId)
        {
            return AjaxHelper.Get<ManufacturerDetailsModel>(m => domain.ManufacturerDetailsGet(manufacturerId));
        }
        

        [HttpPost]
        public async Task<AjaxModel<VehicleDetailsModel>> VehicleServiceSave([FromBody] VehicleServiceViewModel model)
        {
          return await AjaxHelper.SaveGetAsync<VehicleDetailsModel>(m => domain.VehicleServiceSave(model), Messages.Fleet.VehicleServiceSaveSuccess);
        }

        [HttpGet]
        public AjaxModel<VehicleServiceViewModel> VehicleServiceGet(int vehicleServiceId)
        {
            return AjaxHelper.Get<VehicleServiceViewModel>(m => domain.VehicleServiceGet(vehicleServiceId));
        }

        public AjaxModel<List<VehicleServiceViewModel>> VehicleServiceReportGet(int vehicleServiceId, DateTime StartDate, DateTime EndDate)
        {
            return AjaxHelper.Get<List<VehicleServiceViewModel>>(m => domain.VehicleServiceReportGet( vehicleServiceId,  StartDate,  EndDate));
        }

        [HttpGet]
        public AjaxModel<SparePartModel> SparePartGet(int sparePartId)
        {
            return AjaxHelper.Get<SparePartModel>(m => domain.SparePartGet(sparePartId));
        }

        [HttpPost]
        public async Task <AjaxModel<SparePartModel>> SparePartSave([FromBody] SparePartModel model)
        {
            return await AjaxHelper.SaveAsync<SparePartModel>(m => domain.SparePartSave(model), Messages.Fleet.SparePartSaveSuccess);
        }

       

        [HttpGet]
        public AjaxModel<VehicleModel> VehicleGet(int vehicleId)
        {
            return AjaxHelper.Get<VehicleModel>(m => domain.VehicleGet(vehicleId));
        }

        [HttpPost]
        public async Task <AjaxModel<VehicleModel>> VehicleSave([FromBody] VehicleModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleModel>(m => domain.VehicleSave(model), Messages.Fleet.VehicleSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleManufactureModelModel>> ModelSave([FromBody] VehicleManufactureModelModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleManufactureModelModel>(m => domain.ModelSave(model), Messages.Fleet.VehicleModelSaveSuccess);
        }
        

        [HttpGet]
        public AjaxModel<SparePartOrderModel> SparePartOrderGet(int sparePartOrderId)
        {
            return AjaxHelper.Get<SparePartOrderModel>(m => domain.SparePartOrderGet(sparePartOrderId));
        }

        [HttpPost]
        public async  Task<AjaxModel<SparePartOrderModel>> SparePartOrderSave([FromBody] SparePartOrderModel model)
        {
            return await  AjaxHelper.SaveAsync<SparePartOrderModel>(m => domain.SparePartOrderSave(model), Messages.Fleet.SparePartOrderSaveSuccess);
        }


        [HttpPost]
        public async Task<AjaxModel<VehicleTypeModel>> VehicleTypeSave([FromBody] VehicleTypeModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleTypeModel>(m => domain.VehicleTypeSave(model), Messages.Fleet.VehicleTypeSaveSuccess);
        }

        [HttpGet]
        public AjaxModel<List<VehicleDriverModel>> DriversGet()
        {
            return AjaxHelper.Get<List<VehicleDriverModel>>(m => domain.DriversGet());
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleDriverModel>> DriverSaveAsync([FromBody] VehicleDriverModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleDriverModel>(m => domain.DriverSave(model), Messages.Fleet.DriverSaveSuccess);
        }

        [HttpGet]
        public AjaxModel<List<ListItem<int, string>>> DriversListGet()
        {
            return AjaxHelper.Get<List<ListItem<int, string>>>(m => domain.DriversListGet());
        }


        [HttpGet]
        public AjaxModel<List<VehicleManufacturerModel>> ManufacturersGet()
        {
            return AjaxHelper.Get<List<VehicleManufacturerModel>>(m => domain.VehicleManufacturersGet());
        }

        [HttpGet]
        public AjaxModel<VehicleManufacturerModel> ManufacturerGet(int manufacturerId)
        {
            return AjaxHelper.Get<VehicleManufacturerModel>(m => domain.VehicleManufacturerGet(manufacturerId));
        }

        [HttpPost]
        public async Task<AjaxModel<VehicleTypeModel>> ManufacturerSave([FromBody] VehicleManufacturerModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleTypeModel>(m => domain.ManufacturerSave(model), Messages.Fleet.VehicleManufacturerSaveSuccess);
        }

        [HttpGet]
        public AjaxModel<List<FuelModel>> FuelGetList(int vehicleId)
        {
            return AjaxHelper.Get<List<FuelModel>>(m => domain.FuelGetList(vehicleId));
        }

        [HttpPost]
        public async Task<AjaxModel<FuelModel>> FuelSave([FromBody] FuelModel model)
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
        public async Task<AjaxModel<VehicleTripModel>> VehicleTripSave([FromBody] VehicleTripModel model)
        {
            return await AjaxHelper.SaveAsync<VehicleTripModel>(m => domain.VehicleTripSave(model), Messages.Fleet.VehicleTripSaveSuccess);
        }
        
        [HttpGet]
        public async Task<AjaxModel<List<VehicleTripModel>>> VehicleTripListGet(int vehicleTripId)
        {
            return await AjaxHelper.GetAsync<List<VehicleTripModel>>(m => domain.VehicleTripListGet(vehicleTripId));
        }

        [HttpGet]
        public AjaxModel<VehicleTripModel> VehicleTripGet(int vehicleTripId)
        {
            return AjaxHelper.Get<VehicleTripModel>(m => domain.VehicleTripGet(vehicleTripId));
        }
                
        [HttpGet]
        public AjaxModel<string> Test()
        {
            AjaxModel<string> ajax = null;
            try
            {
                var v = SparePartOrderGet(1);

                v.Model.UnitCost = v.Model.UnitCost+25;

                domain.SparePartOrderSave(v.Model);

            }
            catch
            {

            }

            return ajax;

        }

    }
}
