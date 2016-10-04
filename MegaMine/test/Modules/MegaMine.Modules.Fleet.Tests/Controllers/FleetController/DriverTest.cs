//-------------------------------------------------------------------------------------------------
// <copyright file="DriverTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Tests for Driver section in Fleet
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Tests.Controllers.FleetController
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Core.Models;
    using Core.Models.Web;
    using Entities;
    using Microsoft.EntityFrameworkCore;
    using Models;
    using Shared;
    using Xunit;

    public class DriverTest : FleetControllerTest
    {
        [Fact]
        public async void DriversGet()
        {
            // Arrange
            this.FleetDbContext.VehicleDrivers.AddRange(
                    new VehicleDriverEntity() { VehicleDriverId = 1, DriverName = "Peter", CompanyId = 1, DeletedInd = false },
                    new VehicleDriverEntity() { VehicleDriverId = 2, DriverName = "Raju", CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<List<VehicleDriverModel>> ajaxModel = await this.Controller.DriversGet();
            List<VehicleDriverModel> vehicleTypes = ajaxModel.Model;

            // Assert
            Assert.Equal(vehicleTypes.Count, 2);
            Assert.Equal(vehicleTypes[1].DriverName, "Raju");
        }

        [Fact]
        public async void DriverAdd()
        {
            // Arrange
            VehicleDriverModel model = new VehicleDriverModel() { VehicleDriverId = 0, DriverName = "Jagan" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.DriverAdd(model);

            // Assert
            VehicleDriverEntity entity = this.FleetDbContext.VehicleDrivers.Last();
            Assert.Equal(entity.DriverName, "Jagan");
            Assert.Equal(ajaxModel.Message, FleetMessages.DriverSaveSuccess);
        }

        [Fact]
        public async void DriverUpdate()
        {
            // Arrange
            this.FleetDbContext.VehicleDrivers.AddRange(
                    new VehicleDriverEntity() { VehicleDriverId = 1, DriverName = "Peter", CompanyId = 1, DeletedInd = false },
                    new VehicleDriverEntity() { VehicleDriverId = 2, DriverName = "Raju", CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.FleetDbContext);

            VehicleDriverModel model = new VehicleDriverModel() { VehicleDriverId = 2, DriverName = "Jagan" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.DriverUpdate(model);

            // Assert
            VehicleDriverEntity entity = this.FleetDbContext.VehicleDrivers.Where(e => e.VehicleDriverId == 2).First();
            Assert.Equal(entity.DriverName, "Jagan");
            Assert.Equal(ajaxModel.Message, FleetMessages.DriverSaveSuccess);
        }

        [Fact]
        public async void DriversListGet()
        {
            // Arrange
            this.FleetDbContext.VehicleDrivers.AddRange(
                    new VehicleDriverEntity() { VehicleDriverId = 1, DriverName = "Peter", CompanyId = 1, DeletedInd = false },
                    new VehicleDriverEntity() { VehicleDriverId = 2, DriverName = "Raju", CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<List<ListItem<int, string>>> ajaxModel = await this.Controller.DriversListGet();
            List<ListItem<int, string>> vehicleTypes = ajaxModel.Model;

            // Assert
            Assert.Equal(vehicleTypes.Count, 2);
            Assert.Equal(vehicleTypes[1].Item, "Raju");
        }

        [Fact]
        public async void VehicleDriverGetList()
        {
            // Arrange
            this.FleetDbContext.VehicleDrivers.AddRange(
                    new VehicleDriverEntity() { VehicleDriverId = 1, DriverName = "Peter", CompanyId = 1, DeletedInd = false },
                    new VehicleDriverEntity() { VehicleDriverId = 2, DriverName = "Raju", CompanyId = 1, DeletedInd = false });

            this.FleetDbContext.VehicleDriverAssignments.AddRange(
                    new VehicleDriverAssignmentEntity() { VehicleDriverAssignmentId = 1, VehicleDriverId = 1, VehicleId = 1, AssignmentStartDate = new DateTime(2016, 1, 1), AssignmentEndDate = new DateTime(2016, 1, 15), DeletedInd = false, CompanyId = 1 },
                    new VehicleDriverAssignmentEntity() { VehicleDriverAssignmentId = 2, VehicleDriverId = 2, VehicleId = 1, AssignmentStartDate = new DateTime(2016, 1, 20), AssignmentEndDate = new DateTime(2016, 2, 15), DeletedInd = false, CompanyId = 1 },
                    new VehicleDriverAssignmentEntity() { VehicleDriverAssignmentId = 3, VehicleDriverId = 1, VehicleId = 1, AssignmentStartDate = new DateTime(2016, 2, 20), AssignmentEndDate = new DateTime(2016, 3, 1), DeletedInd = false, CompanyId = 1 },
                    new VehicleDriverAssignmentEntity() { VehicleDriverAssignmentId = 4, VehicleDriverId = 1, VehicleId = 2, AssignmentStartDate = new DateTime(2016, 2, 20), AssignmentEndDate = new DateTime(2016, 3, 1), DeletedInd = false, CompanyId = 1 });

            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<List<VehicleDriverAssignmentModel>> ajaxModel = await this.Controller.VehicleDriverGetList(1);
            List<VehicleDriverAssignmentModel> assignments = ajaxModel.Model;

            // Assert
            Assert.Equal(assignments.Count, 3);
            Assert.Equal(assignments[1].DriverName, "Raju");
        }

        [Theory]
        // [InlineData("2016/1/1", "2016/1/15")]
        [InlineData("2016/1/1", null)]
        public async void VehicleDriverAdd(string startDateString, string endDateString)
        {
            // Variables
            DateTime startDate = DateTime.Parse(startDateString);
            DateTime? endDate = null;

            if (endDateString != null)
            {
                endDate = DateTime.Parse(endDateString);
            }

            // Arrange
            this.FleetDbContext.Vehicles.Add(new VehicleEntity() { VehicleId = 1 });
            await this.SaveChangesAsync(this.FleetDbContext);

            VehicleDriverAssignmentModel model = new VehicleDriverAssignmentModel() { VehicleDriverAssignmentId = 0, VehicleDriverId = 2, VehicleId = 1, AssignmentStartDate = startDate, AssignmentEndDate = endDate };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.VehicleDriverAdd(model);

            // Assert
            VehicleEntity vehicle = await this.FleetDbContext.Vehicles.FirstAsync();
            VehicleDriverAssignmentEntity driverAssignment = await this.FleetDbContext.VehicleDriverAssignments.FirstAsync();

            if (endDate == null)
            {
                Assert.Equal(vehicle.VehicleDriverId, 2);
                Assert.Equal(vehicle.VehicleDriverAssignmentId, driverAssignment.VehicleDriverAssignmentId);
            }
            else
            {
                Assert.Equal(driverAssignment.VehicleDriverId, 2);
            }

            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleDriverSaveSuccess);
        }
    }
}
