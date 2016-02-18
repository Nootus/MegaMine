using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MegaMine.Web.Models.Fleet;
using MegaMine.Web.Lib.Entities.Fleet;
using MegaMine.Web.Lib.Entities;
using MegaMine.Web.Lib.Shared;
using System.Data.SqlTypes;
using Microsoft.Data.Entity;
using AutoMapper;
using Microsoft.Data.Entity.Metadata;

namespace MegaMine.Web.Lib.Repositories.Fleet
{
    public class VehicleRepository : BaseRepository
    {
        public VehicleRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        #region Vehicle Trip
        public async Task<List<VehicleTripModel>> VehicleTripListGet(int vehicleId)
        {
            var query = from trips in dbContext.VehicleTrips
                        where trips.DeletedInd == false
                        && trips.VehicleId == vehicleId
                        orderby trips.StartingTime descending
                        select Mapper.Map<VehicleTripEntity, VehicleTripModel>(trips);

            return await  query.ToListAsync();
        }
        
        public async Task VehicleTripSave(VehicleTripModel model)
        {
            await SaveEntity<VehicleTripEntity, VehicleTripModel>(model);
        }
        #endregion

        #region Vehicle Type
        public async Task<List<VehicleTypeModel>> VehicleTypeListGet()
        {
            var query = from types in dbContext.VehicleTypes
                        where types.DeletedInd == false
                            && types.CompanyId == profile.CompanyId
                        orderby types.VehicleTypeName ascending
                        select Mapper.Map<VehicleTypeEntity, VehicleTypeModel>(types);

            return await query.ToListAsync();
        }

        public async Task <List<ListItem<int, string>>> VehicleTypeListItemGet()
        {
            var query = from types in dbContext.VehicleTypes
                        where types.DeletedInd == false
                        && types.CompanyId == profile.CompanyId
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
            await SaveEntity<VehicleTypeEntity, VehicleTypeModel>(model);
        }
        #endregion

        #region Driver
        public async Task<List<VehicleDriverModel>> DriversGet()
        {

            var query = from vd in dbContext.VehicleDrivers
                        where vd.DeletedInd == false
                        && vd.CompanyId == profile.CompanyId
                        select Mapper.Map<VehicleDriverEntity, VehicleDriverModel>(vd);

            return await query.ToListAsync();
        }

        public async Task  DriverSave(VehicleDriverModel model)
        {
            await SaveEntity<VehicleDriverEntity, VehicleDriverModel>(model);
        }
        #endregion

        #region Vehicle Model
        public async Task  ModelSave(VehicleManufactureModelModel model)
        {
            await SaveEntity<VehicleModelEntity, VehicleManufactureModelModel>(model);
        }

        #endregion

        #region Fuel
        public async Task <List<FuelModel>> FuelGetList(int vehicleId)
        {
            var query = from vf in dbContext.VehicleFuels
                        where vf.VehicleId == vehicleId
                        && vf.DeletedInd == false
                        orderby vf.FuelDate descending
                        select Mapper.Map<VehicleFuelEntity, FuelModel>(vf);

            return await  query.ToListAsync();
        }

        public async Task FuelAverage(int vehicleId)
        {
            VehicleEntity vehicleEntity = await (from vehicle in dbContext.Vehicles where vehicle.VehicleId == vehicleId select vehicle).SingleAsync();
            DateTime fuelResetDate = vehicleEntity.FuelResetDate ?? SqlDateTime.MinValue.Value;

            //getting min & max odometer
            decimal? minOdometer = await (from fuel in dbContext.VehicleFuels where fuel.VehicleId == vehicleId && fuel.FuelDate >= fuelResetDate select fuel.Odometer).MinAsync();
            decimal? maxOdometer = await (from fuel in dbContext.VehicleFuels where fuel.VehicleId == vehicleId && fuel.FuelDate >= fuelResetDate select fuel.Odometer).MaxAsync();

            if(minOdometer != null && minOdometer != maxOdometer)
            {
                //calculating the average
                decimal quantity = await (from fuel in dbContext.VehicleFuels where fuel.VehicleId == vehicleId && fuel.Odometer >= minOdometer && fuel.Odometer < maxOdometer select fuel.Quantity).SumAsync();
                vehicleEntity.FuelAverage = (maxOdometer - minOdometer) / quantity;
            }

            dbContext.Vehicles.Update(vehicleEntity);
            await dbContext.SaveChangesAsync();
        }

        public async Task FuelSave(FuelModel model)
        {
            //validating Odometer reading
            VehicleFuelEntity vehicleFuelEntity = await (from fuel in dbContext.VehicleFuels where fuel.VehicleFuelId != model.VehicleFuelId && ((fuel.Odometer >= model.Odometer && fuel.FuelDate < model.FuelDate) || (fuel.Odometer <= model.Odometer && fuel.FuelDate > model.FuelDate)) select fuel).FirstOrDefaultAsync();

            if(vehicleFuelEntity != null)
            {
                throw new NTException(Messages.Fleet.FuelInvalidOdometer);
            }

            await SaveEntity<VehicleFuelEntity, FuelModel>(model);
            await FuelAverage(model.VehicleId);
        }

        public async Task VehicleFuelReset(int vehicleId)
        {
            VehicleEntity vehicleEntity = await (from vehicle in dbContext.Vehicles where vehicle.VehicleId == vehicleId select vehicle).SingleAsync();
            vehicleEntity.FuelAverage = null;
            vehicleEntity.FuelResetDate = DateTime.Now.Date;
            dbContext.Vehicles.Update(vehicleEntity);
            await dbContext.SaveChangesAsync();
        }

        #endregion

        #region Vehicle Driver Assignment
        public async Task<List<VehicleDriverAssignmentModel>> VehicleDriverAssignmentGetList(int vehicleId)
        {
            var query = from vda in dbContext.VehicleDriverAssignments
                        join driver in dbContext.VehicleDrivers on vda.VehicleDriverId equals driver.VehicleDriverId
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

            var query = from vd in dbContext.VehicleDrivers
                        where vd.DeletedInd == false
                        && vd.CompanyId == profile.CompanyId
                        select new ListItem<int, string>
                        {
                            Key = vd.VehicleDriverId,
                            Item = vd.DriverName
                        };

            return await query.ToListAsync();
        }

        public async Task  VehicleDriverSave(VehicleDriverAssignmentModel model)
        {
            if (model.AssignmentStartDate > model.AssignmentEndDate)
            {
                throw new NTException(Messages.Fleet.DriveAssessmentDateError);
            }

            if (model.VehicleDriverAssignmentId == 0)
            {
               await VehicleDriverAdd(model);
            }
            else
            {
               await VehicleDriverUpdate(model);
            }
        }

        public async Task VehicleDriverAdd(VehicleDriverAssignmentModel model)
        {
            VehicleDriverAssignmentEntity entity = await AddEntity<VehicleDriverAssignmentEntity, VehicleDriverAssignmentModel>(model, false);

            if(model.AssignmentEndDate == null)
            {
                //validate whether assignment date is allowed and then set it
                VehicleEntity vehicle = await (from v in dbContext.Vehicles where v.VehicleId == model.VehicleId select v).SingleAsync();
                if(vehicle.VehicleDriverId != null)
                {
                    throw new NTException(Messages.Fleet.DriveAssessmentError);
                }
                else
                {
                    vehicle.VehicleDriverId = model.VehicleDriverId;
                    vehicle.VehicleDriverAssignment = entity;
                    dbContext.Vehicles.Update(vehicle);
                }
            }

            await dbContext.SaveChangesAsync();

        }

        public async Task VehicleDriverUpdate(VehicleDriverAssignmentModel model)
        {
            VehicleDriverAssignmentEntity entity = await UpdateEntity<VehicleDriverAssignmentEntity, VehicleDriverAssignmentModel>(model, false);

            //checking if the current driver is assigned to the vehicle
            VehicleEntity vehicle = await (from v in dbContext.Vehicles where v.VehicleId == model.VehicleId select v).SingleAsync();
            if(vehicle.VehicleDriverAssignmentId == entity.VehicleDriverAssignmentId)
            {
                vehicle.VehicleDriverId = null;
                vehicle.VehicleDriverAssignmentId = null;
                dbContext.Vehicles.Update(vehicle);
            }

            await dbContext.SaveChangesAsync();

        }

        #endregion

        #region VehicleManufacturer
        public async Task<List<ListItem<int, string>>> VehicleManufacturerListItemGet()
        {
            var query = from vm in dbContext.VehicleManufacturers
                        where vm.DeletedInd == false
                        && vm.CompanyId == profile.CompanyId
                        orderby vm.Name ascending
                        select new ListItem<int, string>()
                        {
                            Key = vm.VehicleManufacturerId,
                            Item = vm.Name
                        };

            return  await query.ToListAsync();
        }

        public async Task <VehicleManufacturerModel> VehicleManufacturerGet(int vehicleManufacturerId)
        {
            return Mapper.Map <VehicleManufacturerEntity, VehicleManufacturerModel>(await GetSingleAsync<VehicleManufacturerEntity>(vehicleManufacturerId));
        }

        public async Task<List<VehicleManufacturerModel>> VehicleManufacturersGet()
        {
            return await GetListAsync<VehicleManufacturerEntity, VehicleManufacturerModel>(sort => sort.Name);
        }

        public async Task VehicleManufacturerSave(VehicleManufacturerModel model)
        {
            await SaveEntity<VehicleManufacturerEntity, VehicleManufacturerModel>(model);
        }


        public async Task<List<VehicleManufactureModelModel>> VehicleManufactureModelGet()
        {
            return await GetListAsync<VehicleModelEntity, VehicleManufactureModelModel>(sort => sort.Name);
        }
        #endregion

        #region Vehicle

        public async Task  VehicleSave(VehicleModel model)
        {
            await SaveEntity<VehicleEntity, VehicleModel>(model);
        }

        public async Task <VehicleModel> VehicleGet(int vehicleId)
        {
            VehicleModel model = null;
            if (vehicleId == 0)
            {
                model = new VehicleModel();
                model.VehicleId = 0;
                model.VehicleType = "";
                model.RegistrationNumber = "";
            }
            else
            {
                model = Mapper.Map<VehicleEntity, VehicleModel>(await GetSingleAsync<VehicleEntity>(vehicleId));
            }

            model.VehicleTypeList = await VehicleTypeListItemGet();
            model.ManufacturerList =await VehicleManufacturerListItemGet();
            model.VehicleModelList =await VehicleManufactureModelGet();
            return  model;
        }

        public async Task<VehicleDetailsModel> VehicleDetailsGet(int vehicleId)
        {
            var vehicleQuery = from vehicle in dbContext.Vehicles
                               join vehicleType in dbContext.VehicleTypes on vehicle.VehicleTypeId equals vehicleType.VehicleTypeId
                               join manufacurer in dbContext.VehicleManufacturers on vehicle.VehicleManufacturerId equals manufacurer.VehicleManufacturerId
                               join vehicleModel in dbContext.VehicleModels on vehicle.VehicleModelId equals vehicleModel.VehicleModelId
                               join driver in dbContext.VehicleDrivers on vehicle.VehicleDriverId equals driver.VehicleDriverId into driverJoin
                               from vehicledriver in driverJoin.DefaultIfEmpty()
                               where vehicle.VehicleId == vehicleId
                               select new VehicleDetailsModel
                               {
                                   VehicleId = vehicle.VehicleId,
                                   RegistrationNumber = vehicle.RegistrationNumber,
                                   VehicleType = vehicleType.VehicleTypeName,
                                   Manufacturer = manufacurer.Name,
                                   VehicleModel = vehicleModel.Name,
                                   //Driver = (vehicledriver == null ? null : vehicledriver.DriverName),
                                   VehicleDriverId = vehicle.VehicleDriverId,
                                   VehicleDriverAssignmentId = vehicle.VehicleDriverAssignmentId,
                                   FuelAverage = vehicle.FuelAverage,
                                   FuelResetDate = vehicle.FuelResetDate,
                                   ServiceCost = vehicle.TotalServiceCost,
                                   ServiceDate = vehicle.LastServiceDate,

                               };
            VehicleDetailsModel model = await vehicleQuery.SingleAsync();

            //TODO: due to the RC1 bug calling the Driver separately
            model.Driver = await (from driver in dbContext.VehicleDrivers where driver.VehicleDriverId == model.VehicleDriverId select driver.DriverName).SingleOrDefaultAsync();

            var serviceQuery = from service in dbContext.VehicleServices
                               where service.VehicleId == vehicleId
                               && service.DeletedInd == false
                               orderby service.ServiceStartDate descending
                               select Mapper.Map<VehicleServiceEntity, VehicleServiceModel>(service);

            model.ServiceRecord = await serviceQuery.ToListAsync();

            return  model;

        }

        public async Task <ManufacturerDetailsModel> ManufacturerDetailsGet(int manufacturerId)
        {
            ManufacturerDetailsModel model = Mapper.Map<VehicleManufacturerEntity, ManufacturerDetailsModel>(await GetSingleAsync<VehicleManufacturerEntity>(manufacturerId));

            var modelsQuery = from vm in dbContext.VehicleModels
                              where vm.VehicleManufacturerId == manufacturerId
                              && vm.DeletedInd == false
                              select Mapper.Map<VehicleModelEntity, VehicleManufactureModelModel>(vm);

            model.Models = await modelsQuery.ToListAsync();

            return model;
        }

        public async Task<List<VehicleListModel>> VehicleListGet()
        {
            var query = from vehicles in dbContext.Vehicles
                        join types in dbContext.VehicleTypes on vehicles.VehicleTypeId equals types.VehicleTypeId
                        join model in dbContext.VehicleModels on vehicles.VehicleModelId equals model.VehicleModelId
                        join driver in dbContext.VehicleDrivers on vehicles.VehicleDriverId equals driver.VehicleDriverId into driverJoin
                        from vehicledriver in driverJoin.DefaultIfEmpty()
                        where vehicles.DeletedInd == false
                        && vehicles.CompanyId == profile.CompanyId
                        select new VehicleListModel
                        {
                            VehicleId = vehicles.VehicleId,
                            RegistrationNumber = vehicles.RegistrationNumber,
                            VehicleType = types.VehicleTypeName,
                            LastServiceDate = vehicles.LastServiceDate,
                            TotalServiceCost = vehicles.TotalServiceCost,
                            VehicleModel = model.Name,
                            FuelAverage = vehicles.FuelAverage,
                            //Driver = (vehicledriver == null ? null : vehicledriver.DriverName)
                        };

            return await query.ToListAsync();
        }
        #endregion

        #region Vehicle Service
        public async Task <VehicleServiceModel> VehicleServiceGet(int vehicleServiceId)
        {
            var serviceQuery = from service in dbContext.VehicleServices
                               where service.VehicleServiceId == vehicleServiceId
                               select Mapper.Map<VehicleServiceEntity, VehicleServiceModel>(service);
            VehicleServiceModel model = await serviceQuery.SingleOrDefaultAsync();

            //for adding return blank model
            if (model == null)
                model = new VehicleServiceModel() { ServiceDate = DateTime.Now };

            return  model;
        }

        public async Task<List<VehicleServiceModel>> VehicleServiceReportGet(int vehicleServiceId, DateTime StartDate, DateTime EndDate )
        {
            var serviceQuery = from service in dbContext.VehicleServices
                               where (vehicleServiceId == 0 || service.VehicleServiceId == vehicleServiceId )
                               &&  (service.ServiceStartDate > StartDate)
                               &&  (service.ServiceStartDate < EndDate)
                               && service.DeletedInd == false
                               select Mapper.Map<VehicleServiceEntity, VehicleServiceModel>(service);
            return await  serviceQuery.ToListAsync();
                     
        }

        public async Task <VehicleDetailsModel>  VehicleServiceSave(VehicleServiceModel model)
        {
            decimal serviceCost = model.TotalServiceCost;
            if (model.VehicleServiceId != 0)
            {
                VehicleServiceEntity currentService = await (from vsm in dbContext.VehicleServices where vsm.VehicleServiceId == model.VehicleServiceId select vsm).SingleAsync();
                serviceCost = model.TotalServiceCost - currentService.TotalServiceCost;
            }

            //saving vehicle service and updating the vehicle details
            VehicleServiceEntity entity = await SaveEntity<VehicleServiceEntity, VehicleServiceModel>(model, false);
            await VehicleServiceVehicleUpdate(entity, serviceCost);
            await dbContext.SaveChangesAsync();

            return await  VehicleDetailsGet(model.VehicleId);
        }

        private async Task VehicleServiceVehicleUpdate(VehicleServiceEntity entity, decimal serviceCost)
        {
            //Updating Vehicle
            VehicleEntity vehicle = await(from vh in dbContext.Vehicles where vh.VehicleId == entity.VehicleId select vh).SingleAsync();
            vehicle.TotalServiceCost += serviceCost;
            vehicle.LastServiceDate = entity.ServiceStartDate;

            dbContext.Vehicles.Update(vehicle);
        }
        #endregion
    }
}
