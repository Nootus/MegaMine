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
            var query = from trips in this.DbContext.VehicleTrips
                        where trips.DeletedInd == false
                        && trips.VehicleId == vehicleId
                        orderby trips.StartingTime descending
                        select Mapper.Map<VehicleTripEntity, VehicleTripModel>(trips);

            return await query.ToListAsync();
        }

        public async Task VehicleTripSave(VehicleTripModel model)
        {
            await this.SaveEntity<VehicleTripEntity, VehicleTripModel>(model);
        }

        // Vehicle Type
        public async Task<List<VehicleTypeModel>> VehicleTypeListGet()
        {
            var query = from types in this.DbContext.VehicleTypes
                        where types.DeletedInd == false
                            && types.CompanyId == this.AppContext.CompanyId
                        orderby types.VehicleTypeName ascending
                        select Mapper.Map<VehicleTypeEntity, VehicleTypeModel>(types);

            return await query.ToListAsync();
        }

        public async Task<List<ListItem<int, string>>> VehicleTypeListItemGet()
        {
            var query = from types in this.DbContext.VehicleTypes
                        where types.DeletedInd == false
                        && types.CompanyId == this.AppContext.CompanyId
                        orderby types.VehicleTypeName ascending
                        select new ListItem<int, string>()
                        {
                            Key = types.VehicleTypeId,
                            Item = types.VehicleTypeName
                        };

            return await query.ToListAsync();
        }

        public async Task VehicleTypeSave(VehicleTypeModel model)
        {
            await this.SaveEntity<VehicleTypeEntity, VehicleTypeModel>(model);
        }

        // Driver
        public async Task<List<VehicleDriverModel>> DriversGet()
        {
            var query = from vd in this.DbContext.VehicleDrivers
                        where vd.DeletedInd == false
                        && vd.CompanyId == this.AppContext.CompanyId
                        select Mapper.Map<VehicleDriverEntity, VehicleDriverModel>(vd);

            return await query.ToListAsync();
        }

        public async Task DriverSave(VehicleDriverModel model)
        {
            await this.SaveEntity<VehicleDriverEntity, VehicleDriverModel>(model);
        }

        // Vehicle Model
        public async Task ModelSave(VehicleManufactureModelModel model)
        {
            await this.SaveEntity<VehicleModelEntity, VehicleManufactureModelModel>(model);
        }

        // Fuel
        public async Task<List<FuelModel>> FuelGetList(int vehicleId)
        {
            var query = from vf in this.DbContext.VehicleFuels
                        where vf.VehicleId == vehicleId
                        && vf.DeletedInd == false
                        orderby vf.FuelDate descending
                        select Mapper.Map<VehicleFuelEntity, FuelModel>(vf);

            return await query.ToListAsync();
        }

        public async Task FuelAverage(int vehicleId)
        {
            VehicleEntity vehicleEntity = await (from vehicle in this.DbContext.Vehicles where vehicle.VehicleId == vehicleId select vehicle).SingleAsync();
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
            VehicleEntity vehicleEntity = await (from vehicle in this.DbContext.Vehicles where vehicle.VehicleId == vehicleId select vehicle).SingleAsync();
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
            var query = from vd in this.DbContext.VehicleDrivers
                        where vd.DeletedInd == false
                        && vd.CompanyId == this.AppContext.CompanyId
                        select new ListItem<int, string>
                        {
                            Key = vd.VehicleDriverId,
                            Item = vd.DriverName
                        };

            return await query.ToListAsync();
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
            VehicleEntity vehicle = await (from v in this.DbContext.Vehicles where v.VehicleId == model.VehicleId select v).SingleAsync();
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
            var query = from vm in this.DbContext.VehicleManufacturers
                        where vm.DeletedInd == false
                        && vm.CompanyId == this.AppContext.CompanyId
                        orderby vm.Name ascending
                        select new ListItem<int, string>()
                        {
                            Key = vm.VehicleManufacturerId,
                            Item = vm.Name
                        };

            return await query.ToListAsync();
        }

        public async Task<VehicleManufacturerModel> VehicleManufacturerGet(int vehicleManufacturerId)
        {
            return Mapper.Map<VehicleManufacturerEntity, VehicleManufacturerModel>(await this.GetSingleAsync<VehicleManufacturerEntity>(vehicleManufacturerId));
        }

        public async Task<List<VehicleManufacturerModel>> VehicleManufacturersGet()
        {
            return await this.GetListAsync<VehicleManufacturerEntity, VehicleManufacturerModel>(sort => sort.Name);
        }

        public async Task VehicleManufacturerSave(VehicleManufacturerModel model)
        {
            await this.SaveEntity<VehicleManufacturerEntity, VehicleManufacturerModel>(model);
        }

        public async Task<List<VehicleManufactureModelModel>> VehicleManufactureModelGet()
        {
            return await this.GetListAsync<VehicleModelEntity, VehicleManufactureModelModel>(sort => sort.Name);
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
                model = Mapper.Map<VehicleEntity, VehicleModel>(await this.GetSingleAsync<VehicleEntity>(vehicleId));
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
            ManufacturerDetailsModel model = Mapper.Map<VehicleManufacturerEntity, ManufacturerDetailsModel>(await this.GetSingleAsync<VehicleManufacturerEntity>(manufacturerId));

            var modelsQuery = from vm in this.DbContext.VehicleModels
                              where vm.VehicleManufacturerId == manufacturerId
                              && vm.DeletedInd == false
                              select Mapper.Map<VehicleModelEntity, VehicleManufactureModelModel>(vm);

            model.Models = await modelsQuery.ToListAsync();

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
            var serviceQuery = from service in this.DbContext.VehicleServices
                               where service.VehicleServiceId == vehicleServiceId
                               select Mapper.Map<VehicleServiceEntity, VehicleServiceModel>(service);
            VehicleServiceModel model = await serviceQuery.SingleOrDefaultAsync();

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
            decimal serviceCost = model.TotalServiceCost;
            if (model.VehicleServiceId != 0)
            {
                VehicleServiceEntity currentService = await (from vsm in this.DbContext.VehicleServices where vsm.VehicleServiceId == model.VehicleServiceId select vsm).SingleAsync();
                serviceCost = model.TotalServiceCost - currentService.TotalServiceCost;
            }

            // saving vehicle service and updating the vehicle details
            VehicleServiceEntity entity = await this.SaveEntity<VehicleServiceEntity, VehicleServiceModel>(model, false);
            await this.VehicleServiceVehicleUpdate(entity, serviceCost);
            await this.DbContext.SaveChangesAsync();

            return await this.VehicleDetailsGet(model.VehicleId);
        }

        private async Task VehicleServiceVehicleUpdate(VehicleServiceEntity entity, decimal serviceCost)
        {
            // Updating Vehicle
            VehicleEntity vehicle = await (from vh in this.DbContext.Vehicles where vh.VehicleId == entity.VehicleId select vh).SingleAsync();
            vehicle.TotalServiceCost += serviceCost;
            vehicle.LastServiceDate = entity.ServiceStartDate;

            this.DbContext.Vehicles.Update(vehicle);
        }
    }
}
