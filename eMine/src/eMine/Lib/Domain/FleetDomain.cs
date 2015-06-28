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
        private VehicleRepository vehicleRepository;
        private SparePartRepository sparepartRepository;
        public FleetDomain(VehicleRepository vehicleRepository, SparePartRepository sparepartRepository)
        {
            this.vehicleRepository = vehicleRepository;
            this.sparepartRepository = sparepartRepository;
        }

        public async Task<List<VehicleListModel>> VehicleList()
        {
            return await vehicleRepository.VehicleListGet();
        }


        public async Task<List<VehicleTypeModel>> VehicleTypeListGet()
        {
            return await vehicleRepository.VehicleTypeListGet();
        }

        public List<SparePartModel> SparePartListGet()
        {
            return sparepartRepository.SparePartListGet();
        }

        public SparePartDetailsModel SparePartDetailsGet(int sparePartId)
        {
            return sparepartRepository.SparePartDetailsGet(sparePartId);
        }

        public ManufacturerDetailsModel ManufacturerDetailsGet(int manufacturerId)
        {
            return vehicleRepository.ManufacturerDetailsGet(manufacturerId);
        }



        public SparePartModel SparePartGet(int sparePartId)
        {
            return sparepartRepository.SparePartGet(sparePartId, vehicleRepository);
        }

        public void SparePartSave(SparePartModel model)
        {
            sparepartRepository.SparePartSave(model);
        }

        public VehicleModel VehicleGet(int vehicleId)
        {
            return vehicleRepository.VehicleGet(vehicleId);
        }

        public void VehicleSave(VehicleModel model)
        {
            vehicleRepository.VehicleSave(model);
        }

        public void ModelSave(VehicleManufactureModelModel model)
        {
             vehicleRepository.ModelSave(model);
        }

        public VehicleTypeModel VehicleTypeGet(int vehicleTypeId)
        {
            return vehicleRepository.VehicleTypeGet(vehicleTypeId);
        }

        public async Task VehicleTypeSave(VehicleTypeModel model)
        {
            await vehicleRepository.VehicleTypeSave(model);
        }

        public void DriverSave(VehicleDriverModel model)
        {
            vehicleRepository.DriverSave(model);
        }

        public List<VehicleManufacturerModel> VehicleManufacturersGet()
        {
            return vehicleRepository.VehicleManufacturersGet();
        }

        public void VehicleManufacturerSave(VehicleManufacturerModel  model)
        {
            vehicleRepository.VehicleManufacturerSave(model);
        }

        public void VehicleFuelSave(FuelModel model)
        {
            vehicleRepository.FuelSave(model);
        }

        public void SparePartManufacturerSave(SparePartManufacturerModel model)
        {
           sparepartRepository.SparePartManufacturerModelSave(model);
        }

        public void ManufacturerSave(VehicleManufacturerModel model)
        {
            vehicleRepository.VehicleManufacturerSave(model);
        }

        public VehicleManufacturerModel VehicleManufacturerGet(int manufacturerId)
        {
            return vehicleRepository.VehicleManufacturerGet(manufacturerId);
        }

        public SparePartOrderModel SparePartOrderGet(int sparePartOrderId)
        {
            return sparepartRepository.SparePartOrderGet(sparePartOrderId);
        }

        public void SparePartOrderSave(SparePartOrderModel model)
        {
            sparepartRepository.SparePartOrderSave(model);
        }

        public async Task<VehicleDetailsModel> VehicleDetailsGet(int vehicleId)
        {
            return await vehicleRepository.VehicleDetailsGet(vehicleId);
        }

        public VehicleDetailsModel VehicleServiceSave(VehicleServiceViewModel model)
        {
            if (model.MiscCost.Equals(DBNull.Value)) model.MiscCost = 0;
            return vehicleRepository.VehicleServiceSave(model);
        }

        public VehicleServiceViewModel VehicleServiceGet(int vehicleServiceId)
        {
            return vehicleRepository.VehicleServiceGet(vehicleServiceId);
        }

        public List<VehicleServiceViewModel> VehicleServiceReportGet(int vehicleServiceId, DateTime StartDate, DateTime EndDate)
        {
            return vehicleRepository.VehicleServiceReportGet( vehicleServiceId,  StartDate,  EndDate);
        }

        public List<VehicleDriverModel> DriversGet()
        {
            return vehicleRepository.DriversGet();
        }

        public List<FuelModel> FuelGetList(int vehicleId)
        {
            return vehicleRepository.FuelGetList(vehicleId);
        }

        public void FuelSave(FuelModel model)
        {
            vehicleRepository.FuelSave(model);
        }

        public async Task<List<VehicleDriverAssignmentModel>> VehicleDriverGetList(int vehicleId)
        {
            return await vehicleRepository.VehicleDriverAssignmentGetList(vehicleId);
        }

        public List<ListItem<int, string>> DriversListGet()
        {
            return vehicleRepository.DriversListGet();
        }
        public List<ListItem<int, string>> VehicleTripListItemGet(int VehicleId = 0)
        {
            return vehicleRepository.VehicleTripListItemGet(VehicleId);
        }

        public async Task<List<VehicleTripModel>> VehicleTripListGet(int VehicleId = 0)
        {
            return await vehicleRepository.VehicleTripListGet(VehicleId);
        }
        
        public VehicleTripModel VehicleTripGet(int VehicleTripId)
        {
            return vehicleRepository.VehicleTripGet(VehicleTripId);
        }

        public void VehicleTripSave(VehicleTripModel model)
        {
            vehicleRepository.VehicleTripSave(model);
        }

        internal void VehicleDriverSave(VehicleDriverAssignmentModel model)
        {
            vehicleRepository.VehicleDriverSave(model);
        }
    }
}
