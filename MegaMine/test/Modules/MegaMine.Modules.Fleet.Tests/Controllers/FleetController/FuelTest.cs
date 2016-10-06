//-------------------------------------------------------------------------------------------------
// <copyright file="FuelTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Tests for Fuel section in Fleet
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Tests.Controllers.FleetController
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Core.Models.Web;
    using Entities;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using Shared;
    using Xunit;

    public class FuelTest : FleetControllerTest
    {
        [Fact]
        public async void FuelGetList()
        {
            // Arrange
            this.FleetDbContext.VehicleFuels.AddRange(
                    new VehicleFuelEntity() { VehicleFuelId = 1, VehicleId = 1, FuelDate = new DateTime(2016, 1, 1), Odometer = 1000, CompanyId = 1, DeletedInd = false },
                    new VehicleFuelEntity() { VehicleFuelId = 2, VehicleId = 2, FuelDate = new DateTime(2016, 1, 15), Odometer = 200, CompanyId = 1, DeletedInd = false },
                    new VehicleFuelEntity() { VehicleFuelId = 3, VehicleId = 1, FuelDate = new DateTime(2016, 1, 15), Odometer = 1200, CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<List<FuelModel>> ajaxModel = await this.Controller.FuelGetList(1);
            List<FuelModel> fuels = ajaxModel.Model;

            // Assert
            Assert.Equal(fuels.Count, 2);
            Assert.Equal(fuels[0].Odometer, 1200);
        }

        [Fact]
        public async void FuelAdd()
        {
            // Arrange
            await this.ArrangeFuelSave();

            // adding new Fuel record
            FuelModel model = new FuelModel() { VehicleFuelId = 0, VehicleId = 1, FuelDate = new DateTime(2016, 2, 20), Odometer = 1700, Quantity = 30 };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.FuelAdd(model);

            // Assert
            await this.AssertFuelSave(8.89m, ajaxModel.Message);
        }

        [Fact]
        public async void FuelUpdate()
        {
            // Arrange
            await this.ArrangeFuelSave();

            // adding new Fuel record
            FuelModel model = new FuelModel() { VehicleFuelId = 2, VehicleId = 1, FuelDate = new DateTime(2016, 2, 1), Odometer = 1300, Quantity = 30 };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.FuelAdd(model);

            // Assert
            await this.AssertFuelSave(6.67m, ajaxModel.Message);
        }

        [Fact]
        public async void VehicleFuelReset()
        {
            // Arrange
            this.FleetDbContext.Vehicles.AddRange(
                    new VehicleEntity() { VehicleId = 1, FuelAverage = 10, FuelResetDate = new DateTime(2016, 1, 1) },
                    new VehicleEntity() { VehicleId = 2, FuelAverage = 100, FuelResetDate = new DateTime(2016, 1, 15) });
            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.VehicleFuelReset(1);

            // Assert
            VehicleEntity vehicle = await this.FleetDbContext.Vehicles.Where(m => m.VehicleId == 1).SingleAsync();
            Assert.Null(vehicle.FuelAverage);
            Assert.Equal(vehicle.FuelResetDate, DateTime.Now.Date);
            Assert.Equal(ajaxModel.Message, FleetMessages.FuelResetSuccess);
        }

        private async Task ArrangeFuelSave()
        {
            this.FleetDbContext.Vehicles.Add(
                    new VehicleEntity() { VehicleId = 1, FuelResetDate = new DateTime(2016, 1, 15) });

            this.FleetDbContext.VehicleFuels.AddRange(
                    new VehicleFuelEntity() { VehicleFuelId = 0, VehicleId = 1, FuelDate = new DateTime(2016, 1, 1), Odometer = 1000, Quantity = 20 },
                    new VehicleFuelEntity() { VehicleFuelId = 0, VehicleId = 1, FuelDate = new DateTime(2016, 2, 1), Odometer = 1300, Quantity = 25 },
                    new VehicleFuelEntity() { VehicleFuelId = 0, VehicleId = 1, FuelDate = new DateTime(2016, 2, 15), Odometer = 1500, Quantity = 20 });

            await this.SaveChangesAsync(this.FleetDbContext);
        }

        private async Task AssertFuelSave(decimal average, string message)
        {
            VehicleEntity vehicle = await this.FleetDbContext.Vehicles.FirstAsync();
            Assert.Equal(Math.Round(vehicle.FuelAverage.Value, 2), average);
            Assert.Equal(message, FleetMessages.FuelSaveSuccess);
        }
    }
}
