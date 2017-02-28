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
    using System.Linq;
    using Core.Models.Web;
    using Entities;
    using Models;
    using Shared;
    using Xunit;

    public class VehicleTest : FleetControllerTest
    {
        [Fact]
        public async void VehicleList()
        {
            // Arrange
            this.VehicleReferrentialTables();
            this.VehicleTable();
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
            this.VehicleReferrentialTables();
            this.VehicleTable();
            this.VehicleServiceTable();

            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<VehicleDetailsModel> ajaxModel = await this.Controller.VehicleDetailsGet(1);
            VehicleDetailsModel vehicle = ajaxModel.Model;

            // Assert
            Assert.Equal(vehicle.RegistrationNumber, "AP12DB1234");
            Assert.Equal(vehicle.Manufacturer, "Komatsu");
            Assert.Equal(vehicle.FuelAverage, 10.25M);
            Assert.Equal(vehicle.Driver, "Raju");
            Assert.Equal(vehicle.ServiceRecord.Count, 2);
        }

        [Fact]
        public async void VehicleServiceAdd()
        {
            // Arrange
            this.VehicleReferrentialTables();
            this.VehicleTable();
            this.VehicleServiceTable();

            await this.SaveChangesAsync(this.FleetDbContext);

            VehicleServiceModel model = new VehicleServiceModel() { VehicleServiceId = 0, VehicleId = 1, MiscServiceCost = 200, ServiceDate = new DateTime(2016, 10, 1) };

            // Act
            AjaxModel<VehicleDetailsModel> ajaxModel = await this.Controller.VehicleServiceAdd(model);
            VehicleDetailsModel vehicle = ajaxModel.Model;

            // Assert
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleServiceSaveSuccess);
            Assert.Equal(vehicle.ServiceDate, new DateTime(2016, 10, 1));
            Assert.Equal(vehicle.ServiceCost, 500.50M);
            Assert.Equal(vehicle.ServiceRecord.Count, 3);
        }

        [Fact]
        public async void VehicleServiceUpdate()
        {
            // Arrange
            this.VehicleReferrentialTables();
            this.VehicleTable();
            this.VehicleServiceTable();

            await this.SaveChangesAsync(this.FleetDbContext);

            VehicleServiceModel model = new VehicleServiceModel() { VehicleServiceId = 1, VehicleId = 1, MiscServiceCost = 200, ServiceDate = new DateTime(2016, 10, 1) };

            // Act
            AjaxModel<VehicleDetailsModel> ajaxModel = await this.Controller.VehicleServiceUpdate(model);
            VehicleDetailsModel vehicle = ajaxModel.Model;

            // Assert
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleServiceSaveSuccess);
            Assert.Equal(vehicle.ServiceDate, new DateTime(2016, 10, 1));
            Assert.Equal(vehicle.ServiceCost, 400M);
            Assert.Equal(vehicle.ServiceRecord.Count, 2);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(10)]
        public async void VehicleServiceGet(int vehicleServiceId)
        {
            // Arrange
            this.VehicleServiceTable();
            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<VehicleServiceModel> ajaxModel = await this.Controller.VehicleServiceGet(vehicleServiceId);
            VehicleServiceModel model = ajaxModel.Model;

            // Assert
            if (vehicleServiceId == 1)
            {
                Assert.Equal(model.ServiceDate, new DateTime(2016, 1, 1));
                Assert.Equal(model.TotalServiceCost, 100.50M);
            }
            else
            {
                Assert.Equal(model.ServiceDate.Value.Date, DateTime.Now.Date);
                Assert.Equal(model.TotalServiceCost, 0);
            }
        }

        [Theory]
        [InlineData(1, 0, "2016/1/1", "2020/1/1")]
        [InlineData(2, 0, "2016/1/1", "2016/3/1")]
        [InlineData(3, 3, "2016/1/1", "2020/1/1")]
        public async void VehicleServiceReportGet(int testCaseId, int vehicleServiceId, DateTime startDate, DateTime endDate)
        {
            // Arrange
            this.VehicleServiceTable();
            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<List<VehicleServiceModel>> ajaxModel = await this.Controller.VehicleServiceReportGet(vehicleServiceId, startDate, endDate);
            List<VehicleServiceModel> serviceReport = ajaxModel.Model;

            // Assert
            switch (testCaseId)
            {
                case 1:
                    Assert.Equal(serviceReport[1].TotalServiceCost, 200M);
                    Assert.Equal(serviceReport.Count, 2);
                    break;
                case 2:
                    Assert.Equal(serviceReport[0].TotalServiceCost, 100.50M);
                    Assert.Equal(serviceReport.Count, 1);
                    break;
                case 3:
                    Assert.Equal(serviceReport[0].TotalServiceCost, 200M);
                    Assert.Equal(serviceReport.Count, 1);
                    break;
            }
        }

        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        public async void VehicleGet(int vehicleId)
        {
            // Act
            this.VehicleReferrentialTables();
            this.VehicleTable();
            await this.SaveChangesAsync(this.FleetDbContext);

            // Arrange
            AjaxModel<VehicleModel> ajaxModel = await this.Controller.VehicleGet(vehicleId);
            VehicleModel vehicle = ajaxModel.Model;

            // Assert
            if (vehicleId == 0)
            {
                Assert.Equal(vehicle.RegistrationNumber, string.Empty);
            }
            else
            {
                Assert.Equal(vehicle.RegistrationNumber, "AP12DB1234");
            }

            Assert.Equal(vehicle.ManufacturerList.Count, 2);
            Assert.Equal(vehicle.ManufacturerList[1].Item, "Komatsu");
            Assert.Equal(vehicle.VehicleModelList.Count, 2);
            Assert.Equal(vehicle.VehicleModelList[1].Name, "PC3000-6");
            Assert.Equal(vehicle.VehicleTypeList.Count, 2);
            Assert.Equal(vehicle.VehicleTypeList[1].Item, "Truck");
            Assert.Equal(vehicle.OwnershipList.Count, 2);
            Assert.Equal(vehicle.OwnershipList[1].Item, "Rent");
        }

        [Fact]
        public async void VehicleAdd()
        {
            // Arrange
            VehicleModel model = new VehicleModel() { VehicleId = 0, RegistrationNumber = "AP12345", VehicleManufacturerId = 1, VehicleModelId = 1, VehicleTypeId = 1, OwnershipId = 1 };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.VehicleAdd(model);

            // Assert
            VehicleEntity entity = this.FleetDbContext.Vehicles.Last();
            Assert.Equal(entity.RegistrationNumber, "AP12345");
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleSaveSuccess);
        }

        [Fact]
        public async void VehicleUpdate()
        {
            // Arrange
            this.VehicleTable();
            await this.SaveChangesAsync(this.FleetDbContext);

            VehicleModel model = new VehicleModel() { VehicleId = 1, RegistrationNumber = "AP12345", VehicleManufacturerId = 1, VehicleModelId = 1, VehicleTypeId = 1, OwnershipId = 1 };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.VehicleUpdate(model);

            // Assert
            VehicleEntity entity = this.FleetDbContext.Vehicles.First(m => m.VehicleId == model.VehicleId);
            Assert.Equal(entity.RegistrationNumber, "AP12345");
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleSaveSuccess);
        }

        [Fact]
        public async void VehicleDelete()
        {
            // Arrange
            this.VehicleTable();
            await this.SaveChangesAsync(this.FleetDbContext);

            int vehicleId = 3;

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.VehicleDelete(vehicleId);

            // Assert
            VehicleEntity entity = this.FleetDbContext.Vehicles.First(m => m.VehicleId == vehicleId);
            Assert.Equal(entity.DeletedInd, true);
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleDeleteSuccess);
        }

        private void VehicleReferrentialTables()
        {
            this.FleetDbContext.VehicleTypes.AddRange(
                new VehicleTypeEntity() { VehicleTypeId = 1, VehicleTypeName = "Escavator", CompanyId = 1, DeletedInd = false },
                new VehicleTypeEntity() { VehicleTypeId = 2, VehicleTypeName = "Truck", CompanyId = 1, DeletedInd = false });

            this.FleetDbContext.Ownerships.AddRange(
                new OwnershipEntity() { OwnershipId = 1, OwnershipName = "Own", CompanyId = 1, DeletedInd = false },
                new OwnershipEntity() { OwnershipId = 2, OwnershipName = "Rent", CompanyId = 1, DeletedInd = false });

            this.FleetDbContext.VehicleManufacturers.AddRange(
                    new VehicleManufacturerEntity() { VehicleManufacturerId = 1, Name = "Deere", CompanyId = 1, DeletedInd = false },
                    new VehicleManufacturerEntity() { VehicleManufacturerId = 2, Name = "Komatsu", CompanyId = 1, DeletedInd = false });

            this.FleetDbContext.VehicleModels.AddRange(
                    new VehicleModelEntity() { VehicleModelId = 1, Name = "PC138USLC-10", VehicleManufacturerId = 2, CompanyId = 1, DeletedInd = false },
                    new VehicleModelEntity() { VehicleModelId = 2, Name = "PC3000-6", VehicleManufacturerId = 2, CompanyId = 1, DeletedInd = false });

            this.FleetDbContext.VehicleDrivers.AddRange(
                    new VehicleDriverEntity() { VehicleDriverId = 1, DriverName = "Raju" },
                    new VehicleDriverEntity() { VehicleDriverId = 2, DriverName = "Chotu" });
        }

        private void VehicleServiceTable()
        {
            this.FleetDbContext.VehicleServices.AddRange(
                    new VehicleServiceEntity() { VehicleServiceId = 0, VehicleId = 1, ServiceStartDate = new DateTime(2016, 1, 1), TotalServiceCost = 100.50M, CompanyId = 1, DeletedInd = false },
                    new VehicleServiceEntity() { VehicleServiceId = 0, VehicleId = 2, ServiceStartDate = new DateTime(2016, 6, 1), TotalServiceCost = 100.52M, CompanyId = 2, DeletedInd = false },
                    new VehicleServiceEntity() { VehicleServiceId = 0, VehicleId = 1, ServiceStartDate = new DateTime(2016, 6, 1), TotalServiceCost = 200M, CompanyId = 1, DeletedInd = false });
        }

        private void VehicleTable()
        {
            this.FleetDbContext.Vehicles.AddRange(
                    new VehicleEntity() { VehicleId = 1, RegistrationNumber = "AP12DB1234", LastServiceDate = new DateTime(2016, 6, 1), TotalServiceCost = 300.50M, FuelAverage = 10.25M, VehicleTypeId = 1, OwnershipId = 1, VehicleManufacturerId = 2, VehicleModelId = 1, VehicleDriverId = 1, CompanyId = 1, DeletedInd = false },
                    new VehicleEntity() { VehicleId = 2, RegistrationNumber = "AP12DB0000", LastServiceDate = new DateTime(2016, 3, 10), TotalServiceCost = 1000, FuelAverage = 10.25M, CompanyId = 2, DeletedInd = false },
                    new VehicleEntity() { VehicleId = 3, RegistrationNumber = "AP12DB7890", LastServiceDate = new DateTime(2016, 6, 15), TotalServiceCost = 2500, FuelAverage = 15.25M, VehicleTypeId = 2, OwnershipId = 1, VehicleManufacturerId = 2, VehicleModelId = 2, VehicleDriverId = 2, CompanyId = 1, DeletedInd = false });
        }
    }
}
