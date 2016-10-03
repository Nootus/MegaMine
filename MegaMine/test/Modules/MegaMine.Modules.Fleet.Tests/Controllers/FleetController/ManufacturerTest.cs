//-------------------------------------------------------------------------------------------------
// <copyright file="ManufacturerTest.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Tests for Manugacturer section in Fleet
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

    public class ManufacturerTest : FleetControllerTest
    {
        [Fact]
        public async void ManufacturersGet()
        {
            // Arrange
            this.FleetDbContext.VehicleManufacturers.AddRange(
                    new VehicleManufacturerEntity() { VehicleManufacturerId = 1, Name = "Deere", CompanyId = 1, DeletedInd = false },
                    new VehicleManufacturerEntity() { VehicleManufacturerId = 2, Name = "Komatsu", CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<List<VehicleManufacturerModel>> ajaxModel = await this.Controller.ManufacturersGet();
            List<VehicleManufacturerModel> manufacturers = ajaxModel.Model;

            // Assert
            Assert.Equal(manufacturers.Count, 2);
            Assert.Equal(manufacturers[1].Name, "Komatsu");
        }

        [Fact]
        public async void ManufacturerGet()
        {
            // Arrange
            this.FleetDbContext.VehicleManufacturers.AddRange(
                    new VehicleManufacturerEntity() { VehicleManufacturerId = 1, Name = "Deere", CompanyId = 1, DeletedInd = false },
                    new VehicleManufacturerEntity() { VehicleManufacturerId = 2, Name = "Komatsu", CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<VehicleManufacturerModel> ajaxModel = await this.Controller.ManufacturerGet(2);
            VehicleManufacturerModel manufacturer = ajaxModel.Model;

            // Assert
            Assert.Equal(manufacturer.Name, "Komatsu");
        }

        [Fact]
        public async void ManufacturerAdd()
        {
            // Arrange
            VehicleManufacturerModel model = new VehicleManufacturerModel() { VehicleManufacturerId = 0, Name = "Cat" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.ManufacturerAdd(model);

            // Assert
            VehicleManufacturerEntity entity = this.FleetDbContext.VehicleManufacturers.Last();
            Assert.Equal(entity.Name, "Cat");
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleManufacturerSaveSuccess);
        }

        [Fact]
        public async void ManufacturerUpdate()
        {
            // Arrange
            this.FleetDbContext.VehicleManufacturers.AddRange(
                    new VehicleManufacturerEntity() { VehicleManufacturerId = 1, Name = "Deere", CompanyId = 1, DeletedInd = false },
                    new VehicleManufacturerEntity() { VehicleManufacturerId = 2, Name = "Komatsu", CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.FleetDbContext);

            VehicleManufacturerModel model = new VehicleManufacturerModel() { VehicleManufacturerId = 2, Name = "Cat" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.ManufacturerUpdate(model);

            // Assert
            VehicleManufacturerEntity entity = this.FleetDbContext.VehicleManufacturers.Where(e => e.VehicleManufacturerId == 2).First();
            Assert.Equal(entity.Name, "Cat");
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleManufacturerSaveSuccess);
        }

        [Fact]
        public async void ManufacturerDetailsGet()
        {
            // Arrange
            this.FleetDbContext.VehicleManufacturers.AddRange(
                    new VehicleManufacturerEntity() { VehicleManufacturerId = 1, Name = "Deere", CompanyId = 1, DeletedInd = false },
                    new VehicleManufacturerEntity() { VehicleManufacturerId = 2, Name = "Komatsu", CompanyId = 1, DeletedInd = false });

            this.FleetDbContext.VehicleModels.AddRange(
                    new VehicleModelEntity() { VehicleModelId = 1, Name = "210G LC", VehicleManufacturerId = 1, CompanyId = 1, DeletedInd = false },
                    new VehicleModelEntity() { VehicleModelId = 2, Name = "PC138USLC-10", VehicleManufacturerId = 2, CompanyId = 1, DeletedInd = false },
                    new VehicleModelEntity() { VehicleModelId = 3, Name = "PC3000-6", VehicleManufacturerId = 2, CompanyId = 1, DeletedInd = false });

            await this.SaveChangesAsync(this.FleetDbContext);

            // Act
            AjaxModel<ManufacturerDetailsModel> ajaxModel = await this.Controller.ManufacturerDetailsGet(2);
            ManufacturerDetailsModel manufacturer = ajaxModel.Model;

            // Assert
            Assert.Equal(manufacturer.Name, "Komatsu");
            Assert.Equal(manufacturer.Models.Count, 2);
            Assert.Equal(manufacturer.Models[1].Name, "PC3000-6");
        }

        [Fact]
        public async void ModelAdd()
        {
            // Arrange
            VehicleManufactureModelModel model = new VehicleManufactureModelModel() { VehicleModelId = 0, Name = "PC8000-6" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.ModelAdd(model);

            // Assert
            VehicleModelEntity entity = this.FleetDbContext.VehicleModels.Last();
            Assert.Equal(entity.Name, "PC8000-6");
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleModelSaveSuccess);
        }

        [Fact]
        public async void ModelUpdate()
        {
            // Arrange
            this.FleetDbContext.VehicleModels.AddRange(
                    new VehicleModelEntity() { VehicleModelId = 1, Name = "PC138USLC-10", VehicleManufacturerId = 2, CompanyId = 1, DeletedInd = false },
                    new VehicleModelEntity() { VehicleModelId = 2, Name = "PC3000-6", VehicleManufacturerId = 2, CompanyId = 1, DeletedInd = false });
            await this.SaveChangesAsync(this.FleetDbContext);

            VehicleManufactureModelModel model = new VehicleManufactureModelModel() { VehicleModelId = 2, Name = "PC8000-6" };

            // Act
            AjaxModel<NTModel> ajaxModel = await this.Controller.ModelAdd(model);

            // Assert
            VehicleModelEntity entity = this.FleetDbContext.VehicleModels.Where(e => e.VehicleModelId == 2).First();
            Assert.Equal(entity.Name, "PC8000-6");
            Assert.Equal(ajaxModel.Message, FleetMessages.VehicleModelSaveSuccess);
        }
    }
}