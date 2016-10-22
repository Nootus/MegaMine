//-------------------------------------------------------------------------------------------------
// <copyright file="FleetRepository.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DB Queries related to Fleet
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Data.SqlTypes;
    using System.Linq;
    using System.Threading.Tasks;
    using AutoMapper;
    using MegaMine.Core.Exception;
    using MegaMine.Core.Models;
    using MegaMine.Core.Repositories;
    using MegaMine.Modules.Fleet.Entities;
    using MegaMine.Modules.Fleet.Models;
    using MegaMine.Modules.Fleet.Shared;
    using Microsoft.EntityFrameworkCore;

    public class FleetRepository : BaseRepository<FleetDbContext>
    {
        public FleetRepository(FleetDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        // Vehicle Trip
        public async Task<List<VehicleTripModel>> VehicleTripListGet(int vehicleId)
        {
            return await this.GetListAsync<VehicleTripEntity, VehicleTripModel, DateTime>(w => w.VehicleId == vehicleId, s => s.StartingTime, SortOrder.Descending);
        }

        public async Task VehicleTripSave(VehicleTripModel model)
        {
            await this.SaveEntity<VehicleTripEntity, VehicleTripModel>(model);
        }

        // Vehicle Type
        public async Task<List<VehicleTypeModel>> VehicleTypesGet()
        {
            return await this.GetListAsync<VehicleTypeEntity, VehicleTypeModel>(s => s.VehicleTypeName);
        }

        public async Task<List<ListItem<int, string>>> VehicleTypeListItemGet()
        {
            return await this.GetListItemsAsync<VehicleTypeEntity>(e => new ListItem<int, string> { Key = e.VehicleTypeId, Item = e.VehicleTypeName }, s => s.VehicleTypeName);
        }

        public async Task VehicleTypeSave(VehicleTypeModel model)
        {
            await this.SaveEntity<VehicleTypeEntity, VehicleTypeModel>(model);
        }

        public async Task VehicleTypeDelete(int vehicleTypeId)
        {
            await this.DeleteEntity<VehicleTypeEntity>(vehicleTypeId);
        }

        // Driver
        public async Task<List<VehicleDriverModel>> DriversGet()
        {
            return await this.GetListAsync<VehicleDriverEntity, VehicleDriverModel>(s => s.DriverName);
        }

        public async Task DriverSave(VehicleDriverModel model)
        {
            await this.SaveEntity<VehicleDriverEntity, VehicleDriverModel>(model);
        }

        public async Task DriverDelete(int vehicleDriverId)
        {
            await this.DeleteEntity<VehicleDriverEntity>(vehicleDriverId);
        }

        // Fuel
        public async Task<List<FuelModel>> FuelGetList(int vehicleId)
        {
            return await this.GetListAsync<VehicleFuelEntity, FuelModel, DateTime>(w => w.VehicleId == vehicleId, s => s.FuelDate, SortOrder.Descending);
        }

        public async Task FuelAverage(int vehicleId)
        {
            VehicleEntity vehicleEntity = await this.SingleAsync<VehicleEntity>(e => e.VehicleId == vehicleId);
            DateTime fuelResetDate = vehicleEntity.FuelResetDate ?? SqlDateTime.MinValue.Value;

            // getting min & max odometer
            decimal? minOdometer = await (from fuel in this.DbContext.VehicleFuels where fuel.VehicleId == vehicleId && fuel.FuelDate >= fuelResetDate select fuel.Odometer).MinAsync();
            decimal? maxOdometer = await (from fuel in this.DbContext.VehicleFuels where fuel.VehicleId == vehicleId && fuel.FuelDate >= fuelResetDate select fuel.Odometer).MaxAsync();

            if (minOdometer != null && minOdometer != maxOdometer)
            {
                // calculating the average
                decimal quantity = await (from fuel in this.DbContext.VehicleFuels where fuel.VehicleId == vehicleId && fuel.Odometer >= minOdometer && fuel.Odometer < maxOdometer select fuel.Quantity).SumAsync();
                vehicleEntity.FuelAverage = (maxOdometer - minOdometer) / quantity;
            }

            this.DbContext.Vehicles.Update(vehicleEntity);
            await this.DbContext.SaveChangesAsync();
        }

        public async Task FuelSave(FuelModel model)
        {
            // validating Odometer reading
            VehicleFuelEntity vehicleFuelEntity = await (from fuel in this.DbContext.VehicleFuels where fuel.VehicleFuelId != model.VehicleFuelId && ((fuel.Odometer >= model.Odometer && fuel.FuelDate < model.FuelDate) || (fuel.Odometer <= model.Odometer && fuel.FuelDate > model.FuelDate)) select fuel).FirstOrDefaultAsync();

            if (vehicleFuelEntity != null)
            {
                throw new NTException(FleetMessages.FuelInvalidOdometer);
            }

            await this.SaveEntity<VehicleFuelEntity, FuelModel>(model);
            await this.FuelAverage(model.VehicleId);
        }

        public async Task VehicleFuelReset(int vehicleId)
        {
            VehicleEntity vehicleEntity = await this.SingleAsync<VehicleEntity>(e => e.VehicleId == vehicleId);
            vehicleEntity.FuelAverage = null;
            vehicleEntity.FuelResetDate = DateTime.Now.Date;
            this.DbContext.Vehicles.Update(vehicleEntity);
            await this.DbContext.SaveChangesAsync();
        }

        // Vehicle Driver Assignment
        public async Task<List<VehicleDriverAssignmentModel>> VehicleDriverAssignmentGetList(int vehicleId)
        {
            var query = from vda in this.DbContext.VehicleDriverAssignments
                        join driver in this.DbContext.VehicleDrivers on vda.VehicleDriverId equals driver.VehicleDriverId
                        where vda.VehicleId == vehicleId
                        && vda.DeletedInd == false
                        orderby vda.VehicleDriverAssignmentId descending
                        select new VehicleDriverAssignmentModel
                        {
                           VehicleDriverAssignmentId = vda.VehicleDriverAssignmentId,
                           VehicleDriverId = vda.VehicleDriverId,
                           DriverName = driver.DriverName,
                           VehicleId = vda.VehicleId,
                           AssignmentStartDate = vda.AssignmentStartDate,
                           AssignmentEndDate = vda.AssignmentEndDate
                        };

            return await query.ToListAsync();
        }

        public async Task<List<ListItem<int, string>>> DriversListGet()
        {
            return await this.GetListItemsAsync<VehicleDriverEntity>(e => new ListItem<int, string> { Key = e.VehicleDriverId, Item = e.DriverName }, s => s.DriverName);
        }

        public async Task VehicleDriverSave(VehicleDriverAssignmentModel model)
        {
            if (model.AssignmentStartDate > model.AssignmentEndDate)
            {
                throw new NTException(FleetMessages.DriveAssessmentDateError);
            }

            if (model.VehicleDriverAssignmentId == 0)
            {
               await this.VehicleDriverAdd(model);
            }
            else
            {
               await this.VehicleDriverUpdate(model);
            }
        }

        public async Task VehicleDriverAdd(VehicleDriverAssignmentModel model)
        {
            VehicleDriverAssignmentEntity entity = await this.AddEntity<VehicleDriverAssignmentEntity, VehicleDriverAssignmentModel>(model, false);

            if (model.AssignmentEndDate == null)
            {
                // validate whether assignment date is allowed and then set it
                VehicleEntity vehicle = await (from v in this.DbContext.Vehicles where v.VehicleId == model.VehicleId select v).SingleAsync();
                if (vehicle.VehicleDriverId != null)
                {
                    throw new NTException(FleetMessages.DriveAssessmentError);
                }
                else
                {
                    vehicle.VehicleDriverId = model.VehicleDriverId;
                    vehicle.VehicleDriverAssignment = entity;
                    this.DbContext.Vehicles.Update(vehicle);
                }
            }

            await this.DbContext.SaveChangesAsync();
        }

        public async Task VehicleDriverUpdate(VehicleDriverAssignmentModel model)
        {
            VehicleDriverAssignmentEntity entity = await this.UpdateEntity<VehicleDriverAssignmentEntity, VehicleDriverAssignmentModel>(model, false);

            // checking if the current driver is assigned to the vehicle
            VehicleEntity vehicle = await this.SingleAsync<VehicleEntity>(e => e.VehicleId == model.VehicleId);
            if (vehicle.VehicleDriverAssignmentId == entity.VehicleDriverAssignmentId)
            {
                vehicle.VehicleDriverId = null;
                vehicle.VehicleDriverAssignmentId = null;
                this.DbContext.Vehicles.Update(vehicle);
            }

            await this.DbContext.SaveChangesAsync();
        }

        // VehicleManufacturer
        public async Task<List<ListItem<int, string>>> VehicleManufacturerListItemGet()
        {
            return await this.GetListItemsAsync<VehicleManufacturerEntity>(e => new ListItem<int, string> { Key = e.VehicleManufacturerId, Item = e.Name }, s => s.Name);
        }

        public async Task<VehicleManufacturerModel> VehicleManufacturerGet(int vehicleManufacturerId)
        {
            return Mapper.Map<VehicleManufacturerEntity, VehicleManufacturerModel>(await this.SingleAsync<VehicleManufacturerEntity>(vehicleManufacturerId));
        }

        public async Task<List<VehicleManufacturerModel>> VehicleManufacturersGet()
        {
            return await this.GetListAsync<VehicleManufacturerEntity, VehicleManufacturerModel>(sort => sort.Name);
        }

        public async Task VehicleManufacturerSave(VehicleManufacturerModel model)
        {
            await this.SaveEntity<VehicleManufacturerEntity, VehicleManufacturerModel>(model);
        }

        public async Task VehicleManufacturerDelete(int manufacturerId)
        {
            await this.DeleteEntity<VehicleManufacturerEntity>(manufacturerId);
        }

        public async Task<List<VehicleManufacturerModelModel>> VehicleManufactureModelGet()
        {
            return await this.GetListAsync<VehicleModelEntity, VehicleManufacturerModelModel>(sort => sort.Name);
        }

        public async Task ModelSave(VehicleManufacturerModelModel model)
        {
            await this.SaveEntity<VehicleModelEntity, VehicleManufacturerModelModel>(model);
        }

        public async Task ModelDelete(int vehicleModelId)
        {
            await this.DeleteEntity<VehicleModelEntity>(vehicleModelId);
        }

        // Vehicle
        public async Task VehicleSave(VehicleModel model)
        {
            await this.SaveEntity<VehicleEntity, VehicleModel>(model);
        }

        public async Task<VehicleModel> VehicleGet(int vehicleId)
        {
            VehicleModel model = null;
            if (vehicleId == 0)
            {
                model = new VehicleModel();
                model.VehicleId = 0;
                model.VehicleType = string.Empty;
                model.RegistrationNumber = string.Empty;
            }
            else
            {
                model = Mapper.Map<VehicleEntity, VehicleModel>(await this.SingleAsync<VehicleEntity>(vehicleId));
            }

            model.VehicleTypeList = await this.VehicleTypeListItemGet();
            model.ManufacturerList = await this.VehicleManufacturerListItemGet();
            model.VehicleModelList = await this.VehicleManufactureModelGet();
            return model;
        }

        public async Task<VehicleDetailsModel> VehicleDetailsGet(int vehicleId)
        {
            var vehicleQuery = from vehicle in this.DbContext.Vehicles
                               join vehicleType in this.DbContext.VehicleTypes on vehicle.VehicleTypeId equals vehicleType.VehicleTypeId
                               join manufacurer in this.DbContext.VehicleManufacturers on vehicle.VehicleManufacturerId equals manufacurer.VehicleManufacturerId
                               join vehicleModel in this.DbContext.VehicleModels on vehicle.VehicleModelId equals vehicleModel.VehicleModelId
                               join driver in this.DbContext.VehicleDrivers on vehicle.VehicleDriverId equals driver.VehicleDriverId into driverJoin
                               from vehicledriver in driverJoin.DefaultIfEmpty()
                               where vehicle.VehicleId == vehicleId
                               select new VehicleDetailsModel
                               {
                                   VehicleId = vehicle.VehicleId,
                                   RegistrationNumber = vehicle.RegistrationNumber,
                                   VehicleType = vehicleType.VehicleTypeName,
                                   Manufacturer = manufacurer.Name,
                                   VehicleModel = vehicleModel.Name,
                                   Driver = vehicledriver == null ? null : vehicledriver.DriverName,
                                   VehicleDriverId = vehicle.VehicleDriverId,
                                   VehicleDriverAssignmentId = vehicle.VehicleDriverAssignmentId,
                                   FuelAverage = vehicle.FuelAverage,
                                   FuelResetDate = vehicle.FuelResetDate,
                                   ServiceCost = vehicle.TotalServiceCost,
                                   ServiceDate = vehicle.LastServiceDate,
                               };
            VehicleDetailsModel model = await vehicleQuery.SingleAsync();

            var serviceQuery = from service in this.DbContext.VehicleServices
                               where service.VehicleId == vehicleId
                               && service.DeletedInd == false
                               orderby service.ServiceStartDate descending
                               select Mapper.Map<VehicleServiceEntity, VehicleServiceModel>(service);

            model.ServiceRecord = await serviceQuery.ToListAsync();

            return model;
        }

        public async Task<ManufacturerDetailsModel> ManufacturerDetailsGet(int manufacturerId)
        {
            ManufacturerDetailsModel model = Mapper.Map<VehicleManufacturerEntity, ManufacturerDetailsModel>(await this.SingleAsync<VehicleManufacturerEntity>(manufacturerId));

            model.Models = await this.GetListAsync<VehicleModelEntity, VehicleManufacturerModelModel>(w => w.VehicleManufacturerId == manufacturerId, s => s.Name);
            return model;
        }

        public async Task<List<VehicleListModel>> VehicleListGet()
        {
            var query = from vehicles in this.DbContext.Vehicles
                        join types in this.DbContext.VehicleTypes on vehicles.VehicleTypeId equals types.VehicleTypeId
                        join model in this.DbContext.VehicleModels on vehicles.VehicleModelId equals model.VehicleModelId
                        join driver in this.DbContext.VehicleDrivers on vehicles.VehicleDriverId equals driver.VehicleDriverId into driverJoin
                        from vehicledriver in driverJoin.DefaultIfEmpty()
                        where vehicles.DeletedInd == false
                        && vehicles.CompanyId == this.AppContext.CompanyId
                        select new VehicleListModel
                        {
                            VehicleId = vehicles.VehicleId,
                            RegistrationNumber = vehicles.RegistrationNumber,
                            VehicleType = types.VehicleTypeName,
                            LastServiceDate = vehicles.LastServiceDate,
                            TotalServiceCost = vehicles.TotalServiceCost,
                            VehicleModel = model.Name,
                            FuelAverage = vehicles.FuelAverage,
                            Driver = vehicledriver == null ? null : vehicledriver.DriverName
                        };

            return await query.ToListAsync();
        }

        // Vehicle Service
        public async Task<VehicleServiceModel> VehicleServiceGet(int vehicleServiceId)
        {
            VehicleServiceModel model = await this.SingleOrDefaultAsync<VehicleServiceEntity, VehicleServiceModel>(e => e.VehicleServiceId == vehicleServiceId);

            // for adding return blank model
            if (model == null)
            {
                model = new VehicleServiceModel() { ServiceDate = DateTime.Now };
            }

            return model;
        }

        public async Task<List<VehicleServiceModel>> VehicleServiceReportGet(int vehicleServiceId, DateTime startDate, DateTime endDate)
        {
            var serviceQuery = from service in this.DbContext.VehicleServices
                               where (vehicleServiceId == 0 || service.VehicleServiceId == vehicleServiceId)
                               && service.ServiceStartDate > startDate
                               && service.ServiceStartDate < endDate
                               && service.DeletedInd == false
                               select Mapper.Map<VehicleServiceEntity, VehicleServiceModel>(service);
            return await serviceQuery.ToListAsync();
        }

        public async Task<VehicleDetailsModel> VehicleServiceSave(VehicleServiceModel model)
        {
            VehicleServiceEntity entity;

            decimal serviceCost = model.TotalServiceCost;
            if (model.VehicleServiceId != 0)
            {
                VehicleServiceEntity currentServiceEntity = await this.SingleAsync<VehicleServiceEntity>(e => e.VehicleServiceId == model.VehicleServiceId);
                serviceCost = model.TotalServiceCost - currentServiceEntity.TotalServiceCost;

                entity = await this.UpdateEntity<VehicleServiceEntity, VehicleServiceModel>(currentServiceEntity, model, false);
            }
            else
            {
                entity = await this.AddEntity<VehicleServiceEntity, VehicleServiceModel>(model, false);
            }

            // updating the vehicle details
            await this.VehicleServiceVehicleUpdate(entity, serviceCost);
            await this.DbContext.SaveChangesAsync();

            return await this.VehicleDetailsGet(model.VehicleId);
        }

        private async Task VehicleServiceVehicleUpdate(VehicleServiceEntity entity, decimal serviceCost)
        {
            // Updating Vehicle
            VehicleEntity vehicle = await this.SingleAsync<VehicleEntity>(e => e.VehicleId == entity.VehicleId);
            vehicle.TotalServiceCost += serviceCost;
            vehicle.LastServiceDate = entity.ServiceStartDate;

            this.DbContext.Vehicles.Update(vehicle);
        }
    }
}
