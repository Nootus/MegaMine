using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eMine.Models.Fleet;
using eMine.Lib.Entities.Fleet;
using eMine.Lib.Entities;
using eMine.Lib.Shared;
using System.Data.SqlTypes;
using Microsoft.Data.Entity;
using AutoMapper;
using Microsoft.Data.Entity.Metadata;

namespace eMine.Lib.Repositories.Fleet
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
            VehicleDriverAssignmentEntity entity = new VehicleDriverAssignmentEntity()
            {
                VehicleDriverAssignmentId = model.VehicleDriverAssignmentId,
                VehicleDriverId = model.VehicleDriverId,
                VehicleId = model.VehicleId,
                AssignmentStartDate = model.AssignmentStartDate,
                AssignmentEndDate = model.AssignmentEndDate
            };
            dbContext.VehicleDriverAssignments.Add(entity);

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
            VehicleDriverAssignmentEntity entity = await (from vd in dbContext.VehicleDriverAssignments where vd.VehicleDriverAssignmentId == model.VehicleDriverAssignmentId select vd).SingleAsync();
            entity.VehicleDriverId = model.VehicleDriverId;
            entity.AssignmentStartDate = model.AssignmentStartDate;
            entity.AssignmentEndDate = model.AssignmentEndDate;
            entity.UpdateAuditFields();
            dbContext.VehicleDriverAssignments.Update(entity);

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

            var query = from vm in dbContext.VehicleManufacturers
                        where vm.VehicleManufacturerId == vehicleManufacturerId
                        select new VehicleManufacturerModel()
                        {
                            VehicleManufacturerId = vm.VehicleManufacturerId,
                            Name = vm.Name,
                            Description = vm.Description
                        };

            return await query.SingleAsync();
        }

        public async Task<List<VehicleManufacturerModel>> VehicleManufacturersGet()
        {

            var query = from vm in dbContext.VehicleManufacturers
                        where vm.DeletedInd == false
                        && vm.CompanyId == profile.CompanyId
                        orderby vm.Name
                        select new VehicleManufacturerModel()
                        {
                            VehicleManufacturerId = vm.VehicleManufacturerId,
                            Name = vm.Name,
                            Description = vm.Description
                        };

            return await  query.ToListAsync();
        }

        public async Task VehicleManufacturerAdd(VehicleManufacturerModel model)
        {
            VehicleManufacturerEntity entity = new VehicleManufacturerEntity()
            {
                VehicleManufacturerId = model.VehicleManufacturerId,
                Name = model.Name,
                Description = model.Description
            };
            dbContext.VehicleManufacturers.Add(entity);
            await  dbContext.SaveChangesAsync();

        }

        public async Task VehicleManufacturerUpdate(VehicleManufacturerModel model)
        {
            VehicleManufacturerEntity entity = await (from vm in dbContext.VehicleManufacturers where vm.VehicleManufacturerId == model.VehicleManufacturerId select vm).SingleAsync();
            entity.Name = model.Name;
            entity.Description = model.Description;
            entity.UpdateAuditFields();
            dbContext.VehicleManufacturers.Update(entity);
            await dbContext.SaveChangesAsync();

        }

        public async Task VehicleManufacturerSave(VehicleManufacturerModel model)
        {
            if (model.VehicleManufacturerId == 0)
            {
               await VehicleManufacturerAdd(model);
            }
            else
            {
               await VehicleManufacturerUpdate(model);
            }
        }


        public async Task<List<VehicleManufactureModelModel>> VehicleManufactureModelGet()
        {
            var query = from vm in dbContext.VehicleModels
                        where vm.DeletedInd == false
                        && vm.CompanyId == profile.CompanyId
                        orderby vm.Name ascending
                        select new VehicleManufactureModelModel
                        {
                            VehicleManufacturerId = vm.VehicleManufacturerId,
                            VehicleModelId = vm.VehicleModelId,
                            Name = vm.Name
                        };

            return await  query.ToListAsync();
        }
        #endregion

        #region Vehicle
        public async Task VehicleUpdate(VehicleModel model)
        {
            VehicleEntity entity = await (from vehicle in dbContext.Vehicles where vehicle.VehicleId == model.VehicleId select vehicle).SingleAsync();
            entity.RegistrationNumber = model.RegistrationNumber;
            entity.VehicleTypeId = model.VehicleTypeId;
            entity.VehicleManufacturerId = model.VehicleManufacturerId;
            entity.VehicleModelId = model.VehicleModelId;
            entity.UpdateAuditFields();

            dbContext.Vehicles.Update(entity);
            await dbContext.SaveChangesAsync();
        }

        public async Task VehicleAdd(VehicleModel model)
        {
            VehicleEntity entity = new VehicleEntity()
            {
                RegistrationNumber = model.RegistrationNumber,
                VehicleTypeId = model.VehicleTypeId,
                TotalServiceCost = 0,
                VehicleManufacturerId = model.VehicleManufacturerId,
                VehicleModelId = model.VehicleModelId
        };

            dbContext.Vehicles.Add(entity);
            await dbContext.SaveChangesAsync();

        }

        public async Task  VehicleSave(VehicleModel model)
        {
            if (model.VehicleId == 0)
            {
               await VehicleAdd(model);
            }
            else
            {
               await VehicleUpdate(model);
            }
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
                var vehicleGetQuery = from vehicle in dbContext.Vehicles
                                      where vehicle.VehicleId == vehicleId
                                      select new VehicleModel
                                      {
                                          VehicleId = vehicle.VehicleId,
                                          RegistrationNumber = vehicle.RegistrationNumber,
                                          VehicleTypeId = vehicle.VehicleTypeId,
                                          VehicleManufacturerId = vehicle.VehicleManufacturerId,
                                          VehicleModelId = vehicle.VehicleModelId
                                      };

                model = await vehicleGetQuery.SingleAsync();
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
                               select new VehicleServiceModel
                               {
                                   VehicleServiceId = service.VehicleServiceId,
                                   ServiceDate = service.ServiceStartDate,
                                   TotalServiceCost = service.TotalServiceCost,
                                   MiscServiceCost = service.MiscServiceCost,
                                   Compliant = service.Compliant
                               };

            model.ServiceRecord = await serviceQuery.ToListAsync();

            return  model;

        }

        public async Task <ManufacturerDetailsModel> ManufacturerDetailsGet(int manufacturerId)
        {
            var manQuery = from manufacturer in dbContext.VehicleManufacturers
                           where manufacturer.VehicleManufacturerId == manufacturerId
                           select new ManufacturerDetailsModel
                           {
                               VehicleManufacturerId = manufacturer.VehicleManufacturerId,
                               Description = manufacturer.Description,
                               Name = manufacturer.Name
                           };

            ManufacturerDetailsModel model = await manQuery.SingleAsync();

            var modelsQuery = from vmodel in dbContext.VehicleModels
                              where vmodel.VehicleManufacturerId == manufacturerId
                              && vmodel.DeletedInd == false
                              select new VehicleManufactureModelModel
                              {
                                  Name = vmodel.Name,
                                  Description = vmodel.Description,
                                  VehicleModelId = vmodel.VehicleModelId,
                                  VehicleManufacturerId = vmodel.VehicleManufacturerId

                              };


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
                               select new VehicleServiceModel
                               {
                                   VehicleServiceId = service.VehicleServiceId,
                                   ServiceDate = service.ServiceStartDate,
                                   VehicleId = service.VehicleId,
                                   Compliant = service.Compliant,
                                   Description = service.Description,
                                   MiscServiceCost = service.MiscServiceCost,
                                   TotalServiceCost = service.TotalServiceCost
                               };
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
                               select new VehicleServiceModel
                               {
                                   VehicleServiceId = service.VehicleServiceId,
                                   ServiceDate = service.ServiceStartDate,
                                   VehicleId = service.VehicleId,
                                   Compliant = service.Compliant,
                                   Description = service.Description,
                                   MiscServiceCost = service.MiscServiceCost,
                                   TotalServiceCost = service.TotalServiceCost
                               };
            return await  serviceQuery.ToListAsync();
                     
        }

        public async Task <VehicleDetailsModel>  VehicleServiceSave(VehicleServiceModel model)
        {
            if (model.VehicleServiceId == 0)
            {
               await VehicleServiceAdd(model);
            }
            else
            {
              await VehicleServiceUpdate(model);
            }

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

        private async Task VehicleServiceAdd(VehicleServiceModel model)
        {
            VehicleServiceEntity entity = Mapper.Map<VehicleServiceModel, VehicleServiceEntity>(model);
            dbContext.VehicleServices.Add(entity);

            //updating the Vehicle
            await VehicleServiceVehicleUpdate(entity, model.TotalServiceCost);

            await dbContext.SaveChangesAsync();

        }

        public async Task VehicleServiceUpdate(VehicleServiceModel model)
        {
            VehicleServiceEntity entity = await (from vsm in dbContext.VehicleServices where vsm.VehicleServiceId == model.VehicleServiceId select vsm).SingleAsync();
            decimal serviceCost = model.TotalServiceCost - entity.TotalServiceCost;
            Mapper.Map<VehicleServiceModel, VehicleServiceEntity>(model, entity);

            entity.UpdateAuditFields();
            dbContext.VehicleServices.Update(entity);

            //updating the Vehicle
            await VehicleServiceVehicleUpdate(entity, serviceCost);

            await dbContext.SaveChangesAsync();
        }
        #endregion
    }
}
