//-------------------------------------------------------------------------------------------------
// <copyright file="VehicleTypeTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Tests for VehicleType section in Fleet
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Fleet.Tests.Controllers.FleetController
{
    using System.Collections.Generic;
    using System.Linq;
    using Core.Models.Web;
    using Entities;
    using Models;
    using Shared;
    using Xunit;

    public class VehicleTypeTest : FleetControllerTest
    {
        [Fact]
        public async void VehicleTypesGet()
        {
            // Arrange
            this.FleetDbContext.VehicleTypes.AddRange(
                    new VehicleTypeEntity() { VehicleTypeId = 1, VehicleTypeName = "Escavator", CompanyId = 1, DeletedInd = false },
                    new VehicleTypeEntity() { VehicleTypeId = 2, VehicleTypeName = "Truck", CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<List<VehicleTypeModel>> ajaxModel = await this.Controller.VehicleTypesGet();
            List<VehicleTypeModel> vehicleTypes = ajaxModel.Model;

            // Assert
            Assert.Equal(vehicleTypes.Count, 2);
            Assert.Equal(vehicleTypes[1].VehicleTypeName, "Truck");
        }

        [Fact]
        public async void VehicleTypeAdd()
        {
            // Arrange
            VehicleTypeModel model = new VehicleTypeModel() { VehicleTypeId = 0, VehicleTypeName = "Bulldozer" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.VehicleTypeAdd(model);

            // Assert
            VehicleTypeEntity entity = this.FleetDbContext.VehicleTypes.Last();
            Assert.Equal(entity.VehicleTypeName, "Bulldozer");
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleTypeSaveSuccess);
        }

        [Fact]
        public async void VehicleTypeUpdate()
        {
            // Arrange
            this.FleetDbContext.VehicleTypes.AddRange(
                    new VehicleTypeEntity() { VehicleTypeId = 1, VehicleTypeName = "Escavator", CompanyId = 1, DeletedInd = false },
                    new VehicleTypeEntity() { VehicleTypeId = 2, VehicleTypeName = "Truck", CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.FleetDbContext);

            VehicleTypeModel model = new VehicleTypeModel() { VehicleTypeId = 2, VehicleTypeName = "Bulldozer" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.VehicleTypeUpdate(model);

            // Assert
            VehicleTypeEntity entity = this.FleetDbContext.VehicleTypes.Where(e => e.VehicleTypeId == 2).First();
            Assert.Equal(entity.VehicleTypeName, "Bulldozer");
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleTypeSaveSuccess);
        }

        [Fact]
        public async void VehicleTypeDelete()
        {
            // Arrange
            this.FleetDbContext.VehicleTypes.AddRange(
                    new VehicleTypeEntity() { VehicleTypeId = 1, VehicleTypeName = "Escavator", CompanyId = 1, DeletedInd = false },
                    new VehicleTypeEntity() { VehicleTypeId = 2, VehicleTypeName = "Truck", CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.VehicleTypeDelete(2);

            // Assert
            VehicleTypeEntity entity = this.FleetDbContext.VehicleTypes.Single(e => e.VehicleTypeId == 2);
            Assert.Equal(entity.DeletedInd, true);
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleTypeDeleteSuccess);
        }
    }
}
