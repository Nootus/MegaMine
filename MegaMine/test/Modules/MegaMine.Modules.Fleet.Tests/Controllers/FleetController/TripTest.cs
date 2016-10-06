//-------------------------------------------------------------------------------------------------
// <copyright file="TripTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Tests for Trip section in Fleet
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Tests.Controllers.FleetController
{
    using System;
    using System.Collections.Generic;
    using Core.Models.Web;
    using Entities;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using Shared;
    using Xunit;

    public class TripTest : FleetControllerTest
    {
        [Fact]
        public async void VehicleTripListGet()
        {
            // Arrange
            this.FleetDbContext.VehicleTrips.AddRange(
                    new VehicleTripEntity() { VehicleTripId = 1, VehicleId = 1, StartingTime = new DateTime(2016, 1, 1), OdometerStart = 100, CompanyId = 1, DeletedInd = false },
                    new VehicleTripEntity() { VehicleTripId = 2, VehicleId = 2, StartingTime = new DateTime(2016, 1, 15), OdometerStart = 100, CompanyId = 1, DeletedInd = false },
                    new VehicleTripEntity() { VehicleTripId = 3, VehicleId = 1, StartingTime = new DateTime(2016, 1, 15), OdometerStart = 200, CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<List<VehicleTripModel>> ajaxModel = await this.Controller.VehicleTripListGet(1);
            List<VehicleTripModel> trips = ajaxModel.Model;

            // Assert
            Assert.Equal(trips.Count, 2);
            Assert.Equal(trips[0].OdometerStart, 200);
        }

        [Fact]
        public async void VehicleTripAdd()
        {
            // Arrange
            VehicleTripModel model = new VehicleTripModel() { VehicleTripId = 0, VehicleId = 1, OdometerStart = 100, StartingTime = new DateTime(2016, 1, 1) };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.VehicleTripAdd(model);

            // Assert
            VehicleTripEntity entity = await this.FleetDbContext.VehicleTrips.LastAsync();

            Assert.Equal(entity.OdometerStart, 100);
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleTripSaveSuccess);
        }

        [Fact]
        public async void VehicleTripUpdate()
        {
            // Arrange
            this.FleetDbContext.VehicleTrips.AddRange(
                    new VehicleTripEntity() { VehicleTripId = 1, VehicleId = 1, OdometerStart = 100, StartingTime = new DateTime(2016, 1, 1) },
                    new VehicleTripEntity() { VehicleTripId = 2, VehicleId = 1, OdometerStart = 200, StartingTime = new DateTime(2016, 1, 15) },
                    new VehicleTripEntity() { VehicleTripId = 3, VehicleId = 2, OdometerStart = 100, StartingTime = new DateTime(2016, 1, 1) });

            await this.SaveChangesAsync(this.FleetDbContext);

            VehicleTripModel model = new VehicleTripModel() { VehicleTripId = 2, VehicleId = 1, OdometerStart = 250, StartingTime = new DateTime(2016, 1, 15) };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.VehicleTripAdd(model);

            // Assert
            VehicleTripEntity entity = await this.FleetDbContext.VehicleTrips.LastAsync(m => m.VehicleTripId == 2);

            Assert.Equal(entity.OdometerStart, 250);
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleTripSaveSuccess);
        }
    }
}
