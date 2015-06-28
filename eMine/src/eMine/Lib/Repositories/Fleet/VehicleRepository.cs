using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eMine.Models.Fleet;
using eMine.Lib.Entities.Fleet;
using eMine.Lib.Entities;
using eMine.Lib.Shared;
using Microsoft.AspNet.Mvc;

namespace eMine.Lib.Repositories.Fleet
{
    public class VehicleRepository : BaseRepository
    {

        public VehicleRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        #region Vehicle Type
        public async Task<List<VehicleTypeModel>> VehicleTypeListGet()
        {
            var query = from types in dbContext.VehicleTypes
                        where types.DeletedInd == false
                        orderby types.VehicleTypeName ascending
                        select new VehicleTypeModel
                        {
                            VehicleTypeId = types.VehicleTypeId,
                            VehicleTypeName = types.VehicleTypeName,
                            VehicleTypeDescription = types.VehicleTypeDescription

                        };

            return await query.ToListAsync();
        }

        public async Task<List<VehicleTripModel>> VehicleTripListGet(int VehicleId = 0)
        {
            var query = from Trips in dbContext.VehicleTrips
                        where Trips.DeletedInd == false
                        && (VehicleId == 0 || Trips.VehicleId == VehicleId)
                        orderby Trips.StartingTime descending
                        select new VehicleTripModel
                        {
                            VehicleTripName= Trips.VehicleTripName,
                            VehicleTripId = Trips.VehicleTripId,
                            VehicleId = Trips.VehicleId,
                            VehicleDriverId = Trips.VehicleDriverId,
                            OdometerStart = Trips.OdometerStart,
                            OdometerEnd = Trips.OdometerEnd,
                            StartingTime = Trips.StartingTime,
                            ReachingTime = Trips.ReachingTime

                        };

            return await query.ToListAsync();
        }
        
        public List<ListItem<int, string>> VehicleTripListItemGet(int VehicleId = 0)
        {
            var query = from Trips in dbContext.VehicleTrips
                        where Trips.DeletedInd == false
                        && (VehicleId == 0 || Trips.VehicleId == VehicleId)
                        orderby Trips.StartingTime descending
                        select new ListItem<int, string>()
                        {
                            Key = Trips.VehicleTripId,
                            Item = Trips.VehicleTripName
                        };

            return query.ToList();
        }
        public VehicleTripModel VehicleTripGet(int vehicleTripId)
        {
            var query = from vt in dbContext.VehicleTrips
                        where vt.VehicleTripId == vehicleTripId
                        && vt.DeletedInd == false
                        select new VehicleTripModel
                        {
                            VehicleTripName = vt.VehicleTripName,
                            VehicleTripId = vt.VehicleTripId,
                            VehicleId = vt.VehicleId,
                            VehicleDriverId = vt.VehicleDriverId,
                            OdometerStart = vt.OdometerStart,
                            OdometerEnd = vt.OdometerEnd,
                            StartingTime = vt.StartingTime,
                            ReachingTime = vt.ReachingTime
                        };


            VehicleTripModel model = query.FirstOrDefault();

            return model;
        }

        public void VehicleTripAdd(VehicleTripModel model)
        {
            VehicleTripEntity entity = new VehicleTripEntity()
            {
                VehicleTripName = model.VehicleTripName,
                VehicleTripId = model.VehicleTripId,
                VehicleId = model.VehicleId,
                VehicleDriverId = model.VehicleDriverId,
                OdometerStart = model.OdometerStart,
                OdometerEnd = model.OdometerEnd,
                StartingTime = model.StartingTime,
                ReachingTime = model.ReachingTime
            };
            dbContext.VehicleTrips.Add(entity);
            dbContext.SaveChanges();

        }

        public void VehicleTripUpdate(VehicleTripModel model)
        {
            //Update the VehicleService Entity first
            VehicleTripEntity entity = (from vt in dbContext.VehicleTrips where vt.VehicleTripId == model.VehicleTripId select vt).First();
            entity.VehicleTripName = model.VehicleTripName;
            entity.VehicleTripId = model.VehicleTripId;
            entity.VehicleId = model.VehicleId;
            entity.VehicleDriverId = model.VehicleDriverId;
            entity.OdometerStart = model.OdometerStart;
            entity.OdometerEnd = model.OdometerEnd;
            entity.StartingTime = model.StartingTime;
            entity.ReachingTime = model.ReachingTime;
            entity.UpdateAuditFields();
            dbContext.VehicleTrips.Update(entity);
            dbContext.SaveChanges();
        }

        public void VehicleTripSave(VehicleTripModel model)
        {
            if (model.VehicleTripId == 0)
            {
                VehicleTripAdd(model);
            }
            else
            {
                VehicleTripUpdate(model);
            }
        }
        //End changes
        
        public List<ListItem<int, string>> VehicleTypeListItemGet()
        {
            var query = from types in dbContext.VehicleTypes
                        where types.DeletedInd == false
                        orderby types.VehicleTypeName ascending
                        select new ListItem<int, string>()
                        {
                            Key = types.VehicleTypeId,
                            Item = types.VehicleTypeName
                        };

            return query.ToList();
        }


        public VehicleTypeModel VehicleTypeGet(int vehicleTypeId)
        {

            var query = from vt in dbContext.VehicleTypes
                        where vt.VehicleTypeId == vehicleTypeId
                        && vt.DeletedInd == false
                        select new VehicleTypeModel
                        {
                            VehicleTypeId = vt.VehicleTypeId,
                            VehicleTypeName = vt.VehicleTypeName,
                            VehicleTypeDescription = vt.VehicleTypeDescription
                        };


            VehicleTypeModel model = query.FirstOrDefault();

            return model;
        }

        public void VehicleTypeAdd(VehicleTypeModel model)
        {
            VehicleTypeEntity entity = new VehicleTypeEntity()
            {
                VehicleTypeName = model.VehicleTypeName,
                VehicleTypeDescription = model.VehicleTypeDescription
            };
            dbContext.VehicleTypes.Add(entity);
            dbContext.SaveChanges();

        }

        public void VehicleTypeUpdate(VehicleTypeModel model)
        {
            //Update the VehicleService Entity first
            VehicleTypeEntity entity = (from vt in dbContext.VehicleTypes where vt.VehicleTypeId == model.VehicleTypeId select vt).First();
            entity.VehicleTypeName = model.VehicleTypeName;
            entity.VehicleTypeDescription = model.VehicleTypeDescription;
            entity.UpdateAuditFields();
            dbContext.VehicleTypes.Update(entity);
            dbContext.SaveChanges();

        }

        public void VehicleTypeSave(VehicleTypeModel model)
        {
            if (model.VehicleTypeId == 0)
            {
                VehicleTypeAdd(model);
            }
            else
            {
                VehicleTypeUpdate(model);
            }
        }
        #endregion

        #region Driver
        public VehicleDriverModel DriverGet(int DriverId)
        {

            var query = from vd in dbContext.VehicleDrivers
                        where vd.VehicleDriverId == DriverId
                        && vd.DeletedInd == false
                        select new VehicleDriverModel
                        {
                            VehicleDriverId = vd.VehicleDriverId,
                            DriverName = vd.DriverName,
                            Contact = vd.Contact,
                            PhotoUrl = vd.PhotoUrl
                        };


            VehicleDriverModel model = query.FirstOrDefault();

            return model;
        }

        public void DriverAdd(VehicleDriverModel model)
        {
            VehicleDriverEntity entity = new VehicleDriverEntity()
            {
                VehicleDriverId = model.VehicleDriverId,
                DriverName = model.DriverName,
                Contact = model.Contact,
                PhotoUrl = model.PhotoUrl
            };
            dbContext.VehicleDrivers.Add(entity);
            dbContext.SaveChanges();

        }

        public void DriverUpdate(VehicleDriverModel model)
        {
            //Update the  VehicleDriver Entity first
            VehicleDriverEntity entity = (from vd in dbContext.VehicleDrivers where vd.VehicleDriverId == model.VehicleDriverId select vd).First();
            entity.DriverName = model.DriverName;
            entity.Contact = model.Contact;
            entity.PhotoUrl = model.PhotoUrl;
            entity.UpdateAuditFields();
            dbContext.VehicleDrivers.Update(entity);
            dbContext.SaveChanges();

        }

        public void DriverSave(VehicleDriverModel model)
        {
            if (model.VehicleDriverId == 0)
            {
                DriverAdd(model);
            }
            else
            {
                DriverUpdate(model);
            }
        }

        public void ModelSave(VehicleManufactureModelModel model)
        {
            if (model.VehicleModelId == 0)
            {
                ModelAdd(model);
            }
            else
            {
                ModelUpdate(model);
            }
        }


        public void ModelAdd(VehicleManufactureModelModel model)
        {
            VehicleModelEntity entity = new VehicleModelEntity()
            {
                VehicleManufacturerId = model.VehicleManufacturerId,
                Name = model.Name,
                Description = model.Description
            };
            dbContext.VehicleModels.Add(entity);
            dbContext.SaveChanges();

        }


        public void ModelUpdate(VehicleManufactureModelModel model)
        {
            VehicleModelEntity entity = (from vm in dbContext.VehicleModels where vm.VehicleModelId == model.VehicleModelId select vm).First();
            entity.Name = model.Name;
            entity.Description = model.Description;
            dbContext.VehicleModels.Update(entity);
            dbContext.SaveChanges();            
        }
        
        public List<VehicleDriverModel> DriversGet()
        {

            var query = from vd in dbContext.VehicleDrivers
                        where vd.DeletedInd == false
                        select new VehicleDriverModel
                        {
                            VehicleDriverId = vd.VehicleDriverId,
                            DriverName = vd.DriverName,
                            Contact = vd.Contact,
                            PhotoUrl = vd.PhotoUrl
                        };


            return query.ToList();
        }
        #endregion

        #region Fuel
        public List<FuelModel> FuelGetList(int vehicleId)
        {
            var query = from vf in dbContext.VehicleFuel
                        where vf.VehicleId == vehicleId
                        && vf.DeletedInd == false
                        orderby vf.FuelDate descending
                        select new FuelModel
                        {
                            VehicleFuelId = vf.VehicleFuelId,
                            VehicleId = vf.VehicleId,
                            Odometer = vf.Odometer,
                            Quantity = vf.Fuel,
                            FuelDate = vf.FuelDate
                        };

            return query.ToList();
        }

        public void FuelAdd(FuelModel model)
        {
            VehicleFuelEntity entity = new VehicleFuelEntity()
            {
                VehicleFuelId = model.VehicleFuelId,
                VehicleId = model.VehicleId,
                Odometer = model.Odometer,
                Fuel = model.Quantity,
                FuelDate = model.FuelDate
            };
            dbContext.VehicleFuel.Add(entity);
            dbContext.SaveChanges();

        }

        public void FuelUpdate(FuelModel model)
        {
            //Update the Fuel Entity first
            VehicleFuelEntity entity = (from vf in dbContext.VehicleFuel where vf.VehicleFuelId == model.VehicleFuelId select vf).First();
            entity.FuelDate = model.FuelDate;
            entity.Odometer = model.Odometer;
            entity.Fuel = model.Quantity;
            entity.UpdateAuditFields();
            dbContext.VehicleFuel.Update(entity);
            dbContext.SaveChanges();

        }

        public void FuelSave(FuelModel model)
        {
            if (model.VehicleFuelId == 0)
            {
                FuelAdd(model);
            }
            else
            {
                FuelUpdate(model);
            }
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

        public List<ListItem<int, string>> DriversListGet()
        {

            var query = from vd in dbContext.VehicleDrivers
                        where vd.DeletedInd == false
                        select new ListItem<int, string>
                        {
                            Key = vd.VehicleDriverId,
                            Item = vd.DriverName
                        };

            return query.ToList();
        }

        public void VehicleDriverSave(VehicleDriverAssignmentModel model)
        {
            if (model.VehicleDriverAssignmentId == 0)
            {
                VehicleDriverAdd(model);
            }
            else
            {
                VehicleDriverUpdate(model);
            }
        }

        public void VehicleDriverAdd(VehicleDriverAssignmentModel model)
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
                VehicleEntity vehicle = (from v in dbContext.Vehicles where v.VehicleId == model.VehicleId select v).First();
                if(vehicle.VehicleDriverId != null)
                {
                    throw new eMineException(Messages.Fleet.DriveAssessmentError);
                }
                else
                {
                    vehicle.VehicleDriverId = model.VehicleDriverId;
                    vehicle.VehicleDriverAssignment = entity;
                    dbContext.Vehicles.Update(vehicle);
                }
            }

            dbContext.SaveChanges();

        }

        public void VehicleDriverUpdate(VehicleDriverAssignmentModel model)
        {
            //Update the  VehicleDriver Entity first
            VehicleDriverAssignmentEntity entity = (from vd in dbContext.VehicleDriverAssignments where vd.VehicleDriverAssignmentId == model.VehicleDriverAssignmentId select vd).First();
            entity.VehicleDriverId = model.VehicleDriverId;
            entity.AssignmentStartDate = model.AssignmentStartDate;
            entity.AssignmentEndDate = model.AssignmentEndDate;
            entity.UpdateAuditFields();
            dbContext.VehicleDriverAssignments.Update(entity);

            //checking if the current driver is assigned to the vehicle
            VehicleEntity vehicle = (from v in dbContext.Vehicles where v.VehicleId == model.VehicleId select v).First();
            if(vehicle.VehicleDriverAssignmentId == entity.VehicleDriverAssignmentId)
            {
                vehicle.VehicleDriverId = null;
                vehicle.VehicleDriverAssignmentId = null;
                dbContext.Vehicles.Update(vehicle);
            }

            dbContext.SaveChanges();

        }

        #endregion

        #region VehicleManufacturer
        public List<ListItem<int, string>> VehicleManufacturerListItemGet()
        {
            var query = from vm in dbContext.VehicleManufacturers
                        where vm.DeletedInd == false
                        orderby vm.Name ascending
                        select new ListItem<int, string>()
                        {
                            Key = vm.VehicleManufacturerId,
                            Item = vm.Name
                        };

            return query.ToList();
        }

        public VehicleManufacturerModel VehicleManufacturerGet(int vehicleManufacturerId)
        {

            var query = from vm in dbContext.VehicleManufacturers
                        where vm.VehicleManufacturerId == vehicleManufacturerId
                        && vm.DeletedInd == false
                        select new VehicleManufacturerModel()
                        {
                            VehicleManufacturerId = vm.VehicleManufacturerId,
                            Name = vm.Name,
                            Description = vm.Description
                        };


            VehicleManufacturerModel model = query.FirstOrDefault();

            return model;
        }

        public List<VehicleManufacturerModel> VehicleManufacturersGet()
        {

            var query = from vm in dbContext.VehicleManufacturers
                        where vm.DeletedInd == false
                        select new VehicleManufacturerModel()
                        {
                            VehicleManufacturerId = vm.VehicleManufacturerId,
                            Name = vm.Name,
                            Description = vm.Description
                        };


            return query.ToList();
        }

        public void VehicleManufacturerAdd(VehicleManufacturerModel model)
        {
            VehicleManufacturerEntity entity = new VehicleManufacturerEntity()
            {
                VehicleManufacturerId = model.VehicleManufacturerId,
                Name = model.Name,
                Description = model.Description
            };
            dbContext.VehicleManufacturers.Add(entity);
            dbContext.SaveChanges();

        }

        public void VehicleManufacturerUpdate(VehicleManufacturerModel model)
        {
            //Update the VehicleManufacturer Entity first
            VehicleManufacturerEntity entity = (from vm in dbContext.VehicleManufacturers where vm.VehicleManufacturerId == model.VehicleManufacturerId select vm).First();
            entity.Name = model.Name;
            entity.Description = model.Description;
            entity.UpdateAuditFields();
            dbContext.VehicleManufacturers.Update(entity);
            dbContext.SaveChanges();

        }

        public void VehicleManufacturerSave(VehicleManufacturerModel model)
        {
            if (model.VehicleManufacturerId == 0)
            {
                VehicleManufacturerAdd(model);
            }
            else
            {
                VehicleManufacturerUpdate(model);
            }
        }


        public List<VehicleManufactureModelModel> VehicleManufactureModelGet()
        {
            var query = from vm in dbContext.VehicleModels
                        where vm.DeletedInd == false
                        orderby vm.Name ascending
                        select new VehicleManufactureModelModel
                        {
                            VehicleManufacturerId = vm.VehicleManufacturerId,
                            VehicleModelId = vm.VehicleModelId,
                            Name = vm.Name
                        };

            return query.ToList();
        }
#endregion

        #region Vehicle
        public void VehicleUpdate(VehicleModel model)
        {
            VehicleEntity entity = (from vehicle in dbContext.Vehicles where vehicle.VehicleId == model.VehicleId select vehicle).First();
            entity.RegistrationNumber = model.RegistrationNumber;
            entity.VehicleTypeId = model.VehicleTypeId;
            entity.VehicleManufacturerId = model.VehicleManufacturerId;
            entity.VehicleModelId = model.VehicleModelId;
            entity.UpdateAuditFields();

            dbContext.Vehicles.Update(entity);
            dbContext.SaveChanges();
        }

        public void VehicleAdd(VehicleModel model)
        {
            VehicleEntity entity = new VehicleEntity()
            {
                RegistrationNumber = model.RegistrationNumber,
                VehicleTypeId = model.VehicleTypeId,
                UsedVehicleInd = false,
                TotalServiceCost = 0,
                VehicleManufacturerId = model.VehicleManufacturerId,
                VehicleModelId = model.VehicleModelId
        };

            dbContext.Vehicles.Add(entity);
            dbContext.SaveChanges();

        }

        public void VehicleSave(VehicleModel model)
        {
            if (model.VehicleId == 0)
            {
                VehicleAdd(model);
            }
            else
            {
                VehicleUpdate(model);
            }
        }

        public VehicleModel VehicleGet(int vehicleId)
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
                                      && vehicle.DeletedInd == false
                                      select new VehicleModel
                                      {
                                          VehicleId = vehicle.VehicleId,
                                          RegistrationNumber = vehicle.RegistrationNumber,
                                          VehicleTypeId = vehicle.VehicleTypeId,
                                          VehicleManufacturerId = vehicle.VehicleManufacturerId,
                                          VehicleModelId = vehicle.VehicleModelId,
                                      };

                model = vehicleGetQuery.FirstOrDefault();
            }

            model.VehicleTypeList = VehicleTypeListItemGet();
            model.ManufacturerList = VehicleManufacturerListItemGet();
            model.VehicleModelList = VehicleManufactureModelGet();
            return model;
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
                               && vehicle.DeletedInd == false
                               select new VehicleDetailsModel
                               {
                                   VehicleId = vehicle.VehicleId,
                                   RegistrationNumber = vehicle.RegistrationNumber,
                                   VehicleType = vehicleType.VehicleTypeName,
                                   Manufacturer = manufacurer.Name,
                                   VehicleModel = vehicleModel.Name,
                                   Driver = (vehicledriver == null ? null : vehicledriver.DriverName),
                                   VehicleDriverAssignmentId = vehicle.VehicleDriverAssignmentId,
                                   FuelAverage = vehicle.FuelAverage,
                                   ServiceCost = vehicle.TotalServiceCost,
                                   ServiceDate = vehicle.LastServiceDate
                               };
            VehicleDetailsModel model = vehicleQuery.FirstOrDefault();

            var serviceQuery = from service in dbContext.VehicleServices
                               where service.VehicleId == vehicleId
                               && service.DeletedInd == false
                               orderby service.ServiceStartDate descending
                               select new VehicleServiceModel
                               {
                                   VehicleServiceId = service.VehicleServiceId,
                                   ServiceDate = service.ServiceStartDate,
                                   ServiceCost = service.TotalServiceCost,
                                   Compliant = service.Compliant
                               };

            model.ServiceRecord = await serviceQuery.ToListAsync();

            return model;

        }

        public ManufacturerDetailsModel ManufacturerDetailsGet(int manufacturerId)
        {
            var manQuery = from manufacturer in dbContext.VehicleManufacturers
                           where manufacturer.VehicleManufacturerId == manufacturerId
                           && manufacturer.DeletedInd == false
                           select new ManufacturerDetailsModel
                           {
                               VehicleManufacturerId = manufacturer.VehicleManufacturerId,
                               Description = manufacturer.Description,
                               Name = manufacturer.Name
                           };

            ManufacturerDetailsModel model = manQuery.FirstOrDefault();

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


            model.Models = modelsQuery.ToList();

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
                        && types.DeletedInd == false
                        select new VehicleListModel
                        {
                            VehicleId = vehicles.VehicleId,
                            RegistrationNumber = vehicles.RegistrationNumber,
                            VehicleType = types.VehicleTypeName,
                            LastServiceDate = vehicles.LastServiceDate,
                            TotalServiceCost = vehicles.TotalServiceCost,
                            VehicleModel = model.Name,
                            FuelAverage = vehicles.FuelAverage,
                            Driver = (vehicledriver == null ? null : vehicledriver.DriverName)
                        };

            return query.ToList();
        }
        #endregion

        #region Vehicle Service
        public void VehicleServiceAdd(VehicleServiceViewModel model)
        {
            VehicleServiceEntity service = new VehicleServiceEntity()
            {
                VehicleId = model.VehicleId,
                Compliant = model.Compliant,
                Description = model.Description,
                MiscServiceCost = model.MiscCost,
                ServiceStartDate = model.ServiceDate
            };
            SparePartRepository sparepartRepository = new SparePartRepository(dbContext);

            foreach (var part in model.SpareParts)
            {
                decimal partsCost = sparepartRepository.GetSparePartsCost(part, part.Quantity);

                //THrow the error to indicate that the parts are not sufficient.
                if (partsCost < 0)
                {
                    throw new Exception(string.Format("There is a deficiency of the {0} of {1}", part.Description, partsCost));
                }
            }

            dbContext.VehicleServices.Add(service);
            dbContext.SaveChanges();
            model.VehicleServiceId = service.VehicleServiceId;

            decimal totalCost = 0;
            foreach (var part in model.SpareParts)
            {
                sparepartRepository.CreateVehicleServiceSparePartOrdersLink(part, model, part.Quantity);

                decimal partsCost = sparepartRepository.GetSparePartsCost(part, part.Quantity, true);


                //Update the total available spare parts
                SparePartEntity result = (from p in dbContext.SpareParts
                                          where p.SparePartId == part.SparePartId
                                          && p.DeletedInd == false
                                          select p).SingleOrDefault();

                result.AvailableQuantity -= part.Quantity;


                totalCost += partsCost;

                VehicleServiceSparePartEntity servicePart = new VehicleServiceSparePartEntity()
                {
                    SparePartId = part.SparePartId,
                    ConsumedUnits = part.Quantity,
                    VehicleService = service
                };

                dbContext.VehicleServiceSpareParts.Add(servicePart);
            }


            if (!service.MiscServiceCost.HasValue)
                service.MiscServiceCost = 0;
            service.TotalServiceCost = totalCost + service.MiscServiceCost;
            service.UpdateAuditFields();
            dbContext.VehicleServices.Update(service);
            dbContext.SaveChanges();

        }

        public VehicleServiceViewModel VehicleServiceGet(int vehicleServiceId)
        {
            var serviceQuery = from service in dbContext.VehicleServices
                               where service.VehicleServiceId == vehicleServiceId
                               && service.DeletedInd == false
                               select new VehicleServiceViewModel
                               {
                                   VehicleServiceId = service.VehicleServiceId,
                                   ServiceDate = service.ServiceStartDate,
                                   VehicleId = service.VehicleId,
                                   Compliant = service.Compliant,
                                   Description = service.Description,
                                   MiscCost = service.MiscServiceCost,
                                   ServiceCost = service.TotalServiceCost
                               };
            VehicleServiceViewModel model = serviceQuery.FirstOrDefault();

            //for adding return blank model
            if (model == null)
                model = new VehicleServiceViewModel() { ServiceDate = DateTime.Now };

            var sparePartsQuery = from parts in dbContext.VehicleServiceSpareParts
                                  where parts.VehicleServiceId == vehicleServiceId 
                                  && parts.DeletedInd == false
                                  select new SparePartModel
                                  {
                                      VehicleServiceSparePartId = parts.VehicleServiceSparePartId,
                                      SparePartId = parts.SparePartId,
                                      Quantity = parts.ConsumedUnits
                                  };

            model.SpareParts = sparePartsQuery.ToList();

            SparePartRepository sparePartRepository = new SparePartRepository(dbContext);
            model.SparePartsLookup = sparePartRepository.SparePartListItemGet();

            return model;
        }

        public List<VehicleServiceViewModel> VehicleServiceReportGet(int vehicleServiceId, DateTime StartDate, DateTime EndDate )
        {
            var serviceQuery = from service in dbContext.VehicleServices
                               where (vehicleServiceId == 0 || service.VehicleServiceId == vehicleServiceId )
                               &&  (service.ServiceStartDate > StartDate)
                               &&  (service.ServiceStartDate < EndDate)
                               && service.DeletedInd == false
                               select new VehicleServiceViewModel
                               {
                                   VehicleServiceId = service.VehicleServiceId,
                                   ServiceDate = service.ServiceStartDate,
                                   VehicleId = service.VehicleId,
                                   Compliant = service.Compliant,
                                   Description = service.Description,
                                   MiscCost = service.MiscServiceCost,
                                   ServiceCost = service.TotalServiceCost
                               };
            return  serviceQuery.ToList();
                     
        }

        public VehicleDetailsModel VehicleServiceSave(VehicleServiceViewModel model)
        {
            if (model.VehicleServiceId == 0)
            {
                VehicleServiceAdd(model);
            }
            else
            {
                VehicleServiceUpdate(model);
            }

            return VehicleDetailsGet(model.VehicleId).Result;
        }

        public void VehicleServiceUpdate(VehicleServiceViewModel model)
        {
            //Update the VehicleService Entity first
            VehicleServiceEntity vsEntity =
                (from vsm in dbContext.VehicleServices
                 where vsm.VehicleServiceId == model.VehicleServiceId
                 && vsm.DeletedInd == false
                 select vsm).First();
            vsEntity.Compliant = model.Compliant;
            vsEntity.MiscServiceCost = model.MiscCost;
            vsEntity.ServiceDeliveryDate = model.ServiceDate;
            vsEntity.ServiceStartDate = model.ServiceDate;
            vsEntity.Description = model.Description;
            vsEntity.UpdateAuditFields();
            dbContext.VehicleServices.Update(vsEntity);
            dbContext.SaveChanges();

            //Get the current links from the database for the data integrity
            var query = from vs in dbContext.VehicleServiceSpareParts where vs.VehicleServiceId == model.VehicleServiceId && vs.DeletedInd == false select vs;
            List<VehicleServiceSparePartEntity> spareParts = query.ToList();

            //updating and deleting the existing VehicleServiceSpareParts in DB
            SparePartModel currentPart;
            foreach (var part in spareParts)
            {
                currentPart = model.SpareParts.FirstOrDefault(p => p.VehicleServiceSparePartId == part.VehicleServiceSparePartId && part.DeletedInd == false);
                if (currentPart == null)
                {
                    //user deleted this in the UI
                    part.DeletedInd = true;
                    part.UpdateAuditFields();
                    dbContext.VehicleServiceSpareParts.Update(part);
                }
                else if (currentPart.SparePartId != part.SparePartId || currentPart.Quantity != part.ConsumedUnits)
                {
                    //updating those that have changed
                    part.SparePartId = currentPart.SparePartId;
                    part.ConsumedUnits = currentPart.Quantity;
                    part.UpdateAuditFields();
                    dbContext.VehicleServiceSpareParts.Update(part);
                }
            }

            //finally adding new ones
            List<SparePartModel> newParts = model.SpareParts.FindAll(p => p.VehicleServiceSparePartId == 0);
            foreach (var part in newParts)
            {
                dbContext.VehicleServiceSpareParts.Add(
                    new VehicleServiceSparePartEntity()
                    {
                        VehicleServiceId = model.VehicleServiceId,
                        SparePartId = part.SparePartId,
                        ConsumedUnits = part.Quantity
                    }
                    );
            }

            dbContext.SaveChanges();
        }

        #endregion
    }
}
