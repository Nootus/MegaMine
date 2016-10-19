//-------------------------------------------------------------------------------------------------
// <copyright file="FleetDomain.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Business Logic related to Fleet
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Domain
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MegaMine.Core.Models;
    using MegaMine.Modules.Fleet.Models;
    using MegaMine.Modules.Fleet.Repositories;

    public class FleetDomain
    {
        private FleetRepository fleetRepository;

        public FleetDomain(FleetRepository fleetRepository)
        {
            this.fleetRepository = fleetRepository;
        }

        public async Task<List<VehicleListModel>> VehicleList()
        {
            return await this.fleetRepository.VehicleListGet();
        }

        public async Task<List<VehicleTypeModel>> VehicleTypesGet()
        {
            return await this.fleetRepository.VehicleTypesGet();
        }

        public async Task<ManufacturerDetailsModel> ManufacturerDetailsGet(int manufacturerId)
        {
            return await this.fleetRepository.ManufacturerDetailsGet(manufacturerId);
        }

        public async Task<VehicleModel> VehicleGet(int vehicleId)
        {
            return await this.fleetRepository.VehicleGet(vehicleId);
        }

        public async Task VehicleFuelReset(int vehicleId)
        {
            await this.fleetRepository.VehicleFuelReset(vehicleId);
        }

        public async Task VehicleSave(VehicleModel model)
        {
          await this.fleetRepository.VehicleSave(model);
        }

        public async Task ModelSave(VehicleManufacturerModelModel model)
        {
            await this.fleetRepository.ModelSave(model);
        }

        public async Task ModelDelete(int vehicleModelId)
        {
            await this.fleetRepository.ModelDelete(vehicleModelId);
        }

        public async Task VehicleTypeSave(VehicleTypeModel model)
        {
            await this.fleetRepository.VehicleTypeSave(model);
        }

        public async Task VehicleTypeDelete(int vehicleTypeId)
        {
            await this.fleetRepository.VehicleTypeDelete(vehicleTypeId);
        }

        public async Task DriverSave(VehicleDriverModel model)
        {
           await this.fleetRepository.DriverSave(model);
        }

        public async Task DriverDelete(int vehicleDriverId)
        {
            await this.fleetRepository.DriverDelete(vehicleDriverId);
        }

        public async Task<List<VehicleManufacturerModel>> VehicleManufacturersGet()
        {
            return await this.fleetRepository.VehicleManufacturersGet();
        }

        public async Task VehicleManufacturerSave(VehicleManufacturerModel model)
        {
           await this.fleetRepository.VehicleManufacturerSave(model);
        }

        public async Task VehicleFuelSave(FuelModel model)
        {
           await this.fleetRepository.FuelSave(model);
        }

        public async Task ManufacturerSave(VehicleManufacturerModel model)
        {
           await this.fleetRepository.VehicleManufacturerSave(model);
        }

        public async Task<VehicleManufacturerModel> VehicleManufacturerGet(int manufacturerId)
        {
            return await this.fleetRepository.VehicleManufacturerGet(manufacturerId);
        }

        public async Task<VehicleDetailsModel> VehicleDetailsGet(int vehicleId)
        {
            return await this.fleetRepository.VehicleDetailsGet(vehicleId);
        }

        public async Task<VehicleDetailsModel> VehicleServiceSave(VehicleServiceModel model)
        {
            // calculating the total cost
            model.TotalServiceCost = model.MiscServiceCost;
            return await this.fleetRepository.VehicleServiceSave(model);
        }

        public async Task<VehicleServiceModel> VehicleServiceGet(int vehicleServiceId)
        {
            return await this.fleetRepository.VehicleServiceGet(vehicleServiceId);
        }

        public async Task<List<VehicleServiceModel>> VehicleServiceReportGet(int vehicleServiceId, DateTime startDate, DateTime endDate)
        {
            return await this.fleetRepository.VehicleServiceReportGet(vehicleServiceId, startDate, endDate);
        }

        public async Task<List<VehicleDriverModel>> DriversGet()
        {
            return await this.fleetRepository.DriversGet();
        }

        public async Task<List<FuelModel>> FuelGetList(int vehicleId)
        {
            return await this.fleetRepository.FuelGetList(vehicleId);
        }

        public async Task FuelSave(FuelModel model)
        {
          await this.fleetRepository.FuelSave(model);
        }

        public async Task<List<VehicleDriverAssignmentModel>> VehicleDriverGetList(int vehicleId)
        {
            return await this.fleetRepository.VehicleDriverAssignmentGetList(vehicleId);
        }

        public async Task<List<ListItem<int, string>>> DriversListGet()
        {
            return await this.fleetRepository.DriversListGet();
        }

        public async Task<List<VehicleTripModel>> VehicleTripListGet(int vehicleId)
        {
            return await this.fleetRepository.VehicleTripListGet(vehicleId);
        }

        public async Task VehicleTripSave(VehicleTripModel model)
        {
          await this.fleetRepository.VehicleTripSave(model);
        }

        public async Task VehicleDriverSave(VehicleDriverAssignmentModel model)
        {
          await this.fleetRepository.VehicleDriverSave(model);
        }

/*
        //public async Task<List<SparePartModel>> SparePartListGet()
        //{
        //    return await sparepartRepository.SparePartListGet();
        //}

        //public async Task<SparePartDetailsModel> SparePartDetailsGet(int sparePartId)
        //{
        //   return   await sparepartRepository.SparePartDetailsGet(sparePartId, vehicleRepository);
        //}

        //public async Task<SparePartModel> SparePartGet(int sparePartId)
        //{
        //    return await sparepartRepository.SparePartGet(sparePartId, vehicleRepository);
        //}

        //public async Task  SparePartSave(SparePartModel model)
        //{
        //   await sparepartRepository.SparePartSave(model);
        //}

        //public async Task SparePartManufacturerSave(SparePartManufacturerModel model)
        //{
        //  await sparepartRepository.SparePartManufacturerModelSave(model);
        //}

        //public async Task<SparePartOrderModel> SparePartOrderGet(int sparePartOrderId)
        //{
        //    return await sparepartRepository.SparePartOrderGet(sparePartOrderId);
        //}

        //public async Task  SparePartOrderSave(SparePartOrderModel model)
        //{
        //  await  sparepartRepository.SparePartOrderSave(model);
        //}
*/
    }
}
