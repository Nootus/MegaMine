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
        [HttpGet]
        public AjaxModel<List<VehicleListModel>> VehicleList()
        {
            return AjaxHelper.Get<List<VehicleListModel>>(m => new FleetDomain().VehicleList());
        }

        [HttpGet]
        public AjaxModel<List<VehicleTypeModel>> VehicleTypeListGet()
        {
            return AjaxHelper.Get<List<VehicleTypeModel>>(m => new FleetDomain().VehicleTypeListGet());
        }


        [HttpGet]
        public AjaxModel<List<SparePartModel>> SparePartListGet()
        {
            return AjaxHelper.Get<List<SparePartModel>>(m => new FleetDomain().SparePartListGet());
        }

        
        [HttpGet]
        public AjaxModel<VehicleDetailsModel> VehicleDetailsGet(int vehicleId)
        {
            return AjaxHelper.Get<VehicleDetailsModel>(m => new FleetDomain().VehicleDetailsGet(vehicleId));
        }


        [HttpGet]
        public AjaxModel<SparePartDetailsModel> SparePartDetailsGet(int sparePartId)
        {
            return AjaxHelper.Get<SparePartDetailsModel>(m => new FleetDomain().SparePartDetailsGet(sparePartId));
        }

        [HttpGet]
        public AjaxModel<ManufacturerDetailsModel> ManufacturerDetailsGet(int manufacturerId)
        {
            return AjaxHelper.Get<ManufacturerDetailsModel>(m => new FleetDomain().ManufacturerDetailsGet(manufacturerId));
        }
        

        [HttpPost]
        public AjaxModel<VehicleDetailsModel> VehicleServiceSave([FromBody] VehicleServiceViewModel model)
        {
            return AjaxHelper.SaveGet<VehicleDetailsModel>(m => new FleetDomain().VehicleServiceSave(model), Messages.Fleet.VehicleServiceSaveSuccess);
        }

        [HttpGet]
        public AjaxModel<VehicleServiceViewModel> VehicleServiceGet(int vehicleServiceId)
        {
            return AjaxHelper.Get<VehicleServiceViewModel>(m => new FleetDomain().VehicleServiceGet(vehicleServiceId));
        }

        [HttpGet]
        public AjaxModel<SparePartModel> SparePartGet(int sparePartId)
        {
            return AjaxHelper.Get<SparePartModel>(m => new FleetDomain().SparePartGet(sparePartId));
        }

        [HttpPost]
        public AjaxModel<SparePartModel> SparePartSave([FromBody] SparePartModel model)
        {
            return AjaxHelper.Save<SparePartModel>(m => new FleetDomain().SparePartSave(model), Messages.Fleet.SparePartSaveSuccess);
        }

       

        [HttpGet]
        public AjaxModel<VehicleModel> VehicleGet(int vehicleId)
        {
            return AjaxHelper.Get<VehicleModel>(m => new FleetDomain().VehicleGet(vehicleId));
        }

        [HttpPost]
        public AjaxModel<VehicleModel> VehicleSave([FromBody] VehicleModel model)
        {
            return AjaxHelper.Save<VehicleModel>(m => new FleetDomain().VehicleSave(model), Messages.Fleet.VehicleSaveSuccess);
        }

      
        [HttpGet]
        public AjaxModel<SparePartOrderModel> SparePartOrderGet(int sparePartOrderId)
        {
            return AjaxHelper.Get<SparePartOrderModel>(m => new FleetDomain().SparePartOrderGet(sparePartOrderId));
        }

        [HttpPost]
        public AjaxModel<SparePartOrderModel> SparePartOrderSave([FromBody] SparePartOrderModel model)
        {
            return AjaxHelper.Save<SparePartOrderModel>(m => new FleetDomain().SparePartOrderSave(model), Messages.Fleet.SparePartOrderSaveSuccess);
        }


        [HttpPost]
        public AjaxModel<VehicleTypeModel> VehicleTypeSave([FromBody] VehicleTypeModel model)
        {
            return AjaxHelper.Save<VehicleTypeModel>(m => new FleetDomain().VehicleTypeSave(model), Messages.Fleet.VehicleTypeSaveSuccess);
        }

        [HttpGet]
        public AjaxModel<List<VehicleDriverModel>> DriversGet()
        {
            return AjaxHelper.Get<List<VehicleDriverModel>>(m => new FleetDomain().DriversGet());
        }

        [HttpPost]
        public AjaxModel<VehicleDriverModel> DriverSave([FromBody] VehicleDriverModel model)
        {
            return AjaxHelper.Save<VehicleDriverModel>(m => new FleetDomain().DriverSave(model), Messages.Fleet.DriverSaveSuccess);
        }

        [HttpGet]
        public AjaxModel<List<ListItem<int, string>>> DriversListGet()
        {
            return AjaxHelper.Get<List<ListItem<int, string>>>(m => new FleetDomain().DriversListGet());
        }


        [HttpGet]
        public AjaxModel<List<VehicleManufacturerModel>> ManufacturersGet()
        {
            return AjaxHelper.Get<List<VehicleManufacturerModel>>(m => new FleetDomain().VehicleManufacturersGet());
        }

        [HttpGet]
        public AjaxModel<VehicleManufacturerModel> ManufacturerGet(int manufacturerId)
        {
            return AjaxHelper.Get<VehicleManufacturerModel>(m => new FleetDomain().VehicleManufacturerGet(manufacturerId));
        }

        [HttpPost]
        public AjaxModel<VehicleTypeModel> ManufacturerSave([FromBody] VehicleManufacturerModel model)
        {
            return AjaxHelper.Save<VehicleTypeModel>(m => new FleetDomain().ManufacturerSave(model), Messages.Fleet.VehicleManufacturerSaveSuccess);
        }

        [HttpGet]
        public AjaxModel<List<FuelModel>> FuelGetList(int vehicleId)
        {
            return AjaxHelper.Get<List<FuelModel>>(m => new FleetDomain().FuelGetList(vehicleId));
        }

        [HttpPost]
        public AjaxModel<FuelModel> FuelSave([FromBody] FuelModel model)
        {
            return AjaxHelper.Save<FuelModel>(m => new FleetDomain().FuelSave(model), Messages.Fleet.FuelSaveSuccess);
        }

        [HttpGet]
        public AjaxModel<List<VehicleDriverAssignmentModel>> VehicleDriverGetList(int vehicleId)
        {
            return AjaxHelper.Get<List<VehicleDriverAssignmentModel>>(m => new FleetDomain().VehicleDriverGetList(vehicleId));
        }


        [HttpPost]
        public AjaxModel<VehicleDriverAssignmentModel> VehicleDriverSave([FromBody] VehicleDriverAssignmentModel model)
        {
            return AjaxHelper.Save<VehicleDriverAssignmentModel>(m => new FleetDomain().VehicleDriverSave(model), Messages.Fleet.VehicleDriverSaveSuccess);
        }


        [HttpGet]
        public AjaxModel<string> Test()
        {
            AjaxModel<string> ajax = null;
            try
            {
                var v = SparePartOrderGet(1);

                v.Model.UnitCost = v.Model.UnitCost+25;

                new FleetDomain().SparePartOrderSave(v.Model);

            }
            catch
            {

            }

            return ajax;

        }

    }
}
