//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Tests for Vehicle section in Fleet
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Tests.Controllers.FleetController
{
    using System;
    using System.Collections.Generic;
    using Core.Models.Web;
    using Entities;
    using Models;
    using Xunit;
    using Shared;

    public class VehicleTest : FleetControllerTest
    {
        [Fact]
        public async void VehicleList()
        {
            // Arrange
            this.FleetDbContext.VehicleTypes.AddRange(
                    new VehicleTypeEntity() { VehicleTypeId = 1, VehicleTypeName = "Escavator", CompanyId = 1, DeletedInd = false },
                    new VehicleTypeEntity() { VehicleTypeId = 2, VehicleTypeName = "Truck", CompanyId = 1, DeletedInd = false });

            this.FleetDbContext.VehicleModels.AddRange(
                    new VehicleModelEntity() { VehicleModelId = 1, Name = "PC138USLC-10", VehicleManufacturerId = 2, CompanyId = 1, DeletedInd = false },
                    new VehicleModelEntity() { VehicleModelId = 2, Name = "PC3000-6", VehicleManufacturerId = 2, CompanyId = 1, DeletedInd = false });

            this.FleetDbContext.VehicleDrivers.AddRange(
                    new VehicleDriverEntity() { VehicleDriverId = 1, DriverName = "Raju" },
                    new VehicleDriverEntity() { VehicleDriverId = 2, DriverName = "Chotu" });

            this.FleetDbContext.Vehicles.AddRange(
                    new VehicleEntity() { VehicleId = 1, RegistrationNumber = "AP12DB1234", LastServiceDate = new DateTime(2016, 1, 1), TotalServiceCost = 1000, FuelAverage = 10.25M, VehicleTypeId = 1, VehicleModelId = 1, VehicleDriverId = 1, CompanyId = 1, DeletedInd = false },
                    new VehicleEntity() { VehicleId = 2, RegistrationNumber = "AP12DB0000", LastServiceDate = new DateTime(2016, 3, 10), TotalServiceCost = 1000, FuelAverage = 10.25M, CompanyId = 2, DeletedInd = false },
                    new VehicleEntity() { VehicleId = 3, RegistrationNumber = "AP12DB7890", LastServiceDate = new DateTime(2016, 6, 15), TotalServiceCost = 2500, FuelAverage = 15.25M, VehicleTypeId = 2, VehicleModelId = 2, VehicleDriverId = 2, CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<List<VehicleListModel>> ajaxModel = await this.Controller.VehicleList();
            List<VehicleListModel> vehicles = ajaxModel.Model;

            // Assert
            Assert.Equal(vehicles.Count, 2);
            Assert.Equal(vehicles[1].RegistrationNumber, "AP12DB7890");
            Assert.Equal(vehicles[0].FuelAverage, 10.25M);
            Assert.Equal(vehicles[0].Driver, "Raju");
        }

        [Fact]
        public async void VehicleDetailsGet()
        {
            // Arrange
            this.FleetDbContext.VehicleTypes.AddRange(
                    new VehicleTypeEntity() { VehicleTypeId = 1, VehicleTypeName = "Escavator", CompanyId = 1, DeletedInd = false },
                    new VehicleTypeEntity() { VehicleTypeId = 2, VehicleTypeName = "Truck", CompanyId = 1, DeletedInd = false });

            this.FleetDbContext.VehicleManufacturers.AddRange(
                    new VehicleManufacturerEntity() { VehicleManufacturerId = 1, Name = "Deere", CompanyId = 1, DeletedInd = false },
                    new VehicleManufacturerEntity() { VehicleManufacturerId = 2, Name = "Komatsu", CompanyId = 1, DeletedInd = false });

            this.FleetDbContext.VehicleModels.AddRange(
                    new VehicleModelEntity() { VehicleModelId = 1, Name = "PC138USLC-10", VehicleManufacturerId = 2, CompanyId = 1, DeletedInd = false },
                    new VehicleModelEntity() { VehicleModelId = 2, Name = "PC3000-6", VehicleManufacturerId = 2, CompanyId = 1, DeletedInd = false });

            this.FleetDbContext.VehicleDrivers.AddRange(
                    new VehicleDriverEntity() { VehicleDriverId = 1, DriverName = "Raju" },
                    new VehicleDriverEntity() { VehicleDriverId = 2, DriverName = "Chotu" });

            this.FleetDbContext.Vehicles.AddRange(
                    new VehicleEntity() { VehicleId = 1, RegistrationNumber = "AP12DB1234", LastServiceDate = new DateTime(2016, 1, 1), TotalServiceCost = 1000, FuelAverage = 10.25M, VehicleTypeId = 1, VehicleManufacturerId = 2, VehicleModelId = 1, VehicleDriverId = 1, CompanyId = 1, DeletedInd = false },
                    new VehicleEntity() { VehicleId = 2, RegistrationNumber = "AP12DB0000", LastServiceDate = new DateTime(2016, 3, 10), TotalServiceCost = 1000, FuelAverage = 10.25M, CompanyId = 2, DeletedInd = false },
                    new VehicleEntity() { VehicleId = 3, RegistrationNumber = "AP12DB7890", LastServiceDate = new DateTime(2016, 6, 15), TotalServiceCost = 2500, FuelAverage = 15.25M, VehicleTypeId = 2, VehicleManufacturerId = 2, VehicleModelId = 2, VehicleDriverId = 2, CompanyId = 1, DeletedInd = false });

            this.FleetDbContext.VehicleServices.AddRange(
                    new VehicleServiceEntity() { VehicleServiceId = 1, VehicleId = 3, ServiceStartDate = new DateTime(2016, 6, 1), TotalServiceCost = 100.52M, CompanyId = 1, DeletedInd = false },
                    new VehicleServiceEntity() { VehicleServiceId = 2, VehicleId = 2, ServiceStartDate = new DateTime(2016, 6, 1), TotalServiceCost = 100.52M, CompanyId = 1, DeletedInd = false },
                    new VehicleServiceEntity() { VehicleServiceId = 3, VehicleId = 3, ServiceStartDate = new DateTime(2016, 6, 1), TotalServiceCost = 100.52M, CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<VehicleDetailsModel> ajaxModel = await this.Controller.VehicleDetailsGet(3);
            VehicleDetailsModel vehicle = ajaxModel.Model;

            // Assert
            Assert.Equal(vehicle.RegistrationNumber, "AP12DB7890");
            Assert.Equal(vehicle.Manufacturer, "Komatsu");
            Assert.Equal(vehicle.FuelAverage, 15.25M);
            Assert.Equal(vehicle.Driver, "Chotu");
            Assert.Equal(vehicle.ServiceRecord.Count, 2);
        }

        [Fact]
        public async void VehicleServiceAdd()
        {
            // Arrange
            VehicleServiceModel model = new VehicleServiceModel();

            // Act
            AjaxModel<VehicleDetailsModel> ajaxModel = await this.Controller.VehicleServiceAdd(model);
            VehicleDetailsModel vehicle = ajaxModel.Model;

            // Assert
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleServiceSaveSuccess);
        }
    }
}
