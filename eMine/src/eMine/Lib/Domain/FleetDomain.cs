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
            return sparepartRepository.SparePartDetailsGet(sparePartId, vehicleRepository);
        }

        public ManufacturerDetailsModel ManufacturerDetailsGet(int manufacturerId)
        {
            return vehicleRepository.ManufacturerDetailsGet(manufacturerId);
        }



        public SparePartModel SparePartGet(int sparePartId)
        {
            return sparepartRepository.SparePartGet(sparePartId, vehicleRepository);
        }

        public async Task  SparePartSave(SparePartModel model)
        {
           await sparepartRepository.SparePartSave(model);
        }

        public VehicleModel VehicleGet(int vehicleId)
        {
            return vehicleRepository.VehicleGet(vehicleId);
        }

        public async Task  VehicleSave(VehicleModel model)
        {
          await vehicleRepository.VehicleSave(model);
        }

        public async Task  ModelSave(VehicleManufactureModelModel model)
        {
            await vehicleRepository.ModelSave(model);
        }

        public VehicleTypeModel VehicleTypeGet(int vehicleTypeId)
        {
            return vehicleRepository.VehicleTypeGet(vehicleTypeId);
        }

        public async Task VehicleTypeSave(VehicleTypeModel model)
        {
            await vehicleRepository.VehicleTypeSave(model);
        }

        public async Task  DriverSave(VehicleDriverModel model)
        {
           await vehicleRepository.DriverSave(model);
        }

        public List<VehicleManufacturerModel> VehicleManufacturersGet()
        {
            return vehicleRepository.VehicleManufacturersGet();
        }

        public async Task VehicleManufacturerSave(VehicleManufacturerModel  model)
        {
           await vehicleRepository.VehicleManufacturerSave(model);
        }

        public async Task VehicleFuelSave(FuelModel model)
        {
           await vehicleRepository.FuelSave(model);
        }

        public async Task SparePartManufacturerSave(SparePartManufacturerModel model)
        {
          await sparepartRepository.SparePartManufacturerModelSave(model);
        }

        public async Task  ManufacturerSave(VehicleManufacturerModel model)
        {
           await vehicleRepository.VehicleManufacturerSave(model);
        }

        public VehicleManufacturerModel VehicleManufacturerGet(int manufacturerId)
        {
            return vehicleRepository.VehicleManufacturerGet(manufacturerId);
        }

        public SparePartOrderModel SparePartOrderGet(int sparePartOrderId)
        {
            return sparepartRepository.SparePartOrderGet(sparePartOrderId);
        }

        public async Task  SparePartOrderSave(SparePartOrderModel model)
        {
          await  sparepartRepository.SparePartOrderSave(model);
        }

        public async Task<VehicleDetailsModel> VehicleDetailsGet(int vehicleId)
        {
            return await vehicleRepository.VehicleDetailsGet(vehicleId);
        }

        public async Task <VehicleDetailsModel> VehicleServiceSave(VehicleServiceViewModel model)
        {
            if (model.MiscCost.Equals(DBNull.Value)) model.MiscCost = 0;
            return await  vehicleRepository.VehicleServiceSave(model);
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

        public async Task  FuelSave(FuelModel model)
        {
           await vehicleRepository.FuelSave(model);
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

        public async Task VehicleTripSave(VehicleTripModel model)
        {
          await vehicleRepository.VehicleTripSave(model);
        }

        internal async Task  VehicleDriverSave(VehicleDriverAssignmentModel model)
        {
          await  vehicleRepository.VehicleDriverSave(model);
        }
    }
}
