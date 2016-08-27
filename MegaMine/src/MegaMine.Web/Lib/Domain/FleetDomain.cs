//-------------------------------------------------------------------------------------------------
// <copyright file="FleetDomain.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Business Logic related to Fleet
// </description>
//-------------------------------------------------------------------------------------------------
using MegaMine.Web.Lib.Repositories;
using MegaMine.Web.Lib.Repositories.Fleet;
using MegaMine.Web.Models;
using MegaMine.Web.Models.Fleet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MegaMine.Web.Lib.Entities;
using MegaMine.Core.Models;

namespace MegaMine.Web.Lib.Domain
{
    public class FleetDomain
    {
        private VehicleRepository vehicleRepository;

        public FleetDomain(VehicleRepository vehicleRepository)
        {
            this.vehicleRepository = vehicleRepository;
        }

        public async Task<List<VehicleListModel>> VehicleList()
        {
            return await this.vehicleRepository.VehicleListGet();
        }


        public async Task<List<VehicleTypeModel>> VehicleTypeListGet()
        {
            return await this.vehicleRepository.VehicleTypeListGet();
        }

        public async Task <ManufacturerDetailsModel> ManufacturerDetailsGet(int manufacturerId)
        {
            return await this.vehicleRepository.ManufacturerDetailsGet(manufacturerId);
        }

        public async Task<VehicleModel> VehicleGet(int vehicleId)
        {
            return await this.vehicleRepository.VehicleGet(vehicleId);
        }

        public async Task VehicleFuelReset(int vehicleId)
        {
            await this.vehicleRepository.VehicleFuelReset(vehicleId);
        }               

        public async Task VehicleSave(VehicleModel model)
        {
          await this.vehicleRepository.VehicleSave(model);
        }

        public async Task ModelSave(VehicleManufactureModelModel model)
        {
            await this.vehicleRepository.ModelSave(model);
        }

        public async Task VehicleTypeSave(VehicleTypeModel model)
        {
            await this.vehicleRepository.VehicleTypeSave(model);
        }

        public async Task DriverSave(VehicleDriverModel model)
        {
           await this.vehicleRepository.DriverSave(model);
        }

        public async Task<List<VehicleManufacturerModel>> VehicleManufacturersGet()
        {
            return await this.vehicleRepository.VehicleManufacturersGet();
        }

        public async Task VehicleManufacturerSave(VehicleManufacturerModel  model)
        {
           await this.vehicleRepository.VehicleManufacturerSave(model);
        }

        public async Task VehicleFuelSave(FuelModel model)
        {
           await this.vehicleRepository.FuelSave(model);
        }

        public async Task ManufacturerSave(VehicleManufacturerModel model)
        {
           await this.vehicleRepository.VehicleManufacturerSave(model);
        }

        public async Task <VehicleManufacturerModel> VehicleManufacturerGet(int manufacturerId)
        {
            return await this.vehicleRepository.VehicleManufacturerGet(manufacturerId);
        }

        public async Task<VehicleDetailsModel> VehicleDetailsGet(int vehicleId)
        {
            return await this.vehicleRepository.VehicleDetailsGet(vehicleId);
        }

        public async Task <VehicleDetailsModel> VehicleServiceSave(VehicleServiceModel model)
        {
            // calculating the total cost
            model.TotalServiceCost = model.MiscServiceCost;
            return await  vehicleRepository.VehicleServiceSave(model);
        }

        public async Task <VehicleServiceModel> VehicleServiceGet(int vehicleServiceId)
        {
            return await this.vehicleRepository.VehicleServiceGet(vehicleServiceId);
        }

        public async Task<List<VehicleServiceModel>> VehicleServiceReportGet(int vehicleServiceId, DateTime StartDate, DateTime EndDate)
        {
            return await this.vehicleRepository.VehicleServiceReportGet( vehicleServiceId,  StartDate,  EndDate);
        }

        public async Task<List<VehicleDriverModel>> DriversGet()
        {
            return await this.vehicleRepository.DriversGet();
        }

        public async Task<List<FuelModel>> FuelGetList(int vehicleId)
        {
            return await this.vehicleRepository.FuelGetList(vehicleId);
        }

        public async Task FuelSave(FuelModel model)
        {
          await this.vehicleRepository.FuelSave(model);
        }

        public async Task<List<VehicleDriverAssignmentModel>> VehicleDriverGetList(int vehicleId)
        {
            return await this.vehicleRepository.VehicleDriverAssignmentGetList(vehicleId);
        }

        public async Task<List<ListItem<int, string>>> DriversListGet()
        {
            return await this.vehicleRepository.DriversListGet();
        }

        public async Task<List<VehicleTripModel>> VehicleTripListGet(int vehicleId)
        {
            return await this.vehicleRepository.VehicleTripListGet(vehicleId);
        }
        
        public async Task VehicleTripSave(VehicleTripModel model)
        {
          await this.vehicleRepository.VehicleTripSave(model);
        }

        public async Task VehicleDriverSave(VehicleDriverAssignmentModel model)
        {
          await this.vehicleRepository.VehicleDriverSave(model);
        }

/*
        //public async Task<List<SparePartModel>> SparePartListGet()
        //{
        //    return await sparepartRepository.SparePartListGet();
        //}

        //public async Task <SparePartDetailsModel> SparePartDetailsGet(int sparePartId)
        //{
        //   return   await sparepartRepository.SparePartDetailsGet(sparePartId, vehicleRepository);
        //}

        //public async Task <SparePartModel> SparePartGet(int sparePartId)
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

        //public async Task <SparePartOrderModel> SparePartOrderGet(int sparePartOrderId)
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
