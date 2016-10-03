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
    using System.Collections.Generic;
    using System.Linq;
    using Core.Models;
    using Core.Models.Web;
    using Entities;
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
    }
}
