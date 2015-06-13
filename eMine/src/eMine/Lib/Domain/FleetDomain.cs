using eMine.Lib.Repositories;
using eMine.Lib.Repositories.Fleet;
using eMine.Models;
using eMine.Models.Fleet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eMine.Lib.Entities;

namespace eMine.Lib.Domain
{
    public class FleetDomain
    {
        public List<VehicleListModel> VehicleList()
        {
            return new VehicleRepository().VehicleListGet();
        }

        public List<VehicleTypeModel> VehicleTypeListGet()
        {
            return new VehicleRepository().VehicleTypeListGet();
        }

        public List<SparePartModel> SparePartListGet()
        {
            return new SparePartRepository().SparePartListGet();
        }

        public SparePartDetailsModel SparePartDetailsGet(int sparePartId)
        {
            return new SparePartRepository().SparePartDetailsGet(sparePartId);
        }

        public SparePartModel SparePartGet(int sparePartId)
        {
            return new SparePartRepository().SparePartGet(sparePartId);
        }

        public void SparePartSave(SparePartModel model)
        {
            new SparePartRepository().SparePartSave(model);
        }

        public VehicleModel VehicleGet(int vehicleId)
        {
            return new VehicleRepository().VehicleGet(vehicleId);
        }

        public void VehicleSave(VehicleModel model)
        {
            new VehicleRepository().VehicleSave(model);
        }

        public VehicleTypeModel VehicleTypeGet(int vehicleTypeId)
        {
            return new VehicleRepository().VehicleTypeGet(vehicleTypeId);
        }

        public void VehicleTypeSave(VehicleTypeModel model)
        {
            new VehicleRepository().VehicleTypeSave(model);
        }

        public void DriverSave(VehicleDriverModel model)
        {
            new VehicleRepository().DriverSave(model);
        }

        public List<VehicleManufacturerModel> VehicleManufacturersGet()
        {
            return new VehicleRepository().VehicleManufacturersGet();
        }

        public void VehicleManufacturerSave(VehicleManufacturerModel  model)
        {
            new VehicleRepository().VehicleManufacturerSave(model);
        }

        public void VehicleFuelSave(FuelModel model)
        {
            new VehicleRepository().FuelSave(model);
        }

        public void SparePartManufacturerSave(SparePartManufacturerModel model)
        {
           new SparePartRepository().SparePartManufacturerModelSave(model);
        }

        public void ManufacturerSave(VehicleManufacturerModel model)
        {
            new VehicleRepository().VehicleManufacturerAdd(model);
        }

        public VehicleManufacturerModel VehicleManufacturerGet(int manufacturerId)
        {
            return new VehicleRepository().VehicleManufacturerGet(manufacturerId);
        }

        public SparePartOrderModel SparePartOrderGet(int sparePartOrderId)
        {
            return new SparePartRepository().SparePartOrderGet(sparePartOrderId);
        }

        public void SparePartOrderSave(SparePartOrderModel model)
        {
            new SparePartRepository().SparePartOrderSave(model);
        }

        public VehicleDetailsModel VehicleDetailsGet(int vehicleId)
        {
            return new VehicleRepository().VehicleDetailsGet(vehicleId);
        }

        public VehicleDetailsModel VehicleServiceSave(VehicleServiceViewModel model)
        {
            if (model.MiscCost.Equals(DBNull.Value)) model.MiscCost = 0;
            return new VehicleRepository().VehicleServiceSave(model);
        }

        public VehicleServiceViewModel VehicleServiceGet(int vehicleServiceId)
        {
            return new VehicleRepository().VehicleServiceGet(vehicleServiceId);
        }
        public List<VehicleDriverModel> DriversGet()
        {
            return new VehicleRepository().DriversGet();
        }

        public List<FuelModel> FuelGetList(int vehicleId)
        {
            return new VehicleRepository().FuelGetList(vehicleId);
        }

        public void FuelSave(FuelModel model)
        {
            new VehicleRepository().FuelSave(model);
        }

        public List<VehicleDriverAssignmentModel> VehicleDriverGetList(int vehicleId)
        {
            return new VehicleRepository().VehicleDriverAssignmentGetList(vehicleId);
        }

        public List<ListItem<int, string>> DriversListGet()
        {
            return new VehicleRepository().DriversListGet();
        }

        internal void VehicleDriverSave(VehicleDriverAssignmentModel model)
        {
            new VehicleRepository().VehicleDriverSave(model);
        }
    }
}
