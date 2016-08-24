//-------------------------------------------------------------------------------------------------
// <copyright file="QuarryController.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  ASP controller that handles Angular http requests
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Controllers
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MegaMine.Core.Helpers.Web;
    using MegaMine.Core.Models;
    using MegaMine.Core.Models.Web;
    using MegaMine.Modules.Quarry.Common;
    using MegaMine.Modules.Quarry.Domain;
    using MegaMine.Modules.Quarry.Models;
    using MegaMine.Services.Security.Domain;
    using MegaMine.Services.Widget.Domain;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.DependencyInjection;

    public class QuarryController : Controller
    {
        private QuarryDomain domain;
        private QuarryDashboardDomain dashboardDomain;
        private WidgetDomain widgetDomain;

        public QuarryController(QuarryDomain domain, QuarryDashboardDomain dashboardDomain, WidgetDomain widgetDomain)
        {
            this.domain = domain;
            this.dashboardDomain = dashboardDomain;
            this.widgetDomain = widgetDomain;
        }

        [HttpGet]
        public async Task<AjaxModel<object>> Dashboard()
        {
            return await AjaxHelper.GetDashboardAsync(this.dashboardDomain, this.widgetDomain);
        }

        // Material Colour section
        [HttpGet]
        public async Task<AjaxModel<List<ListItem<int, string>>>> MaterialColourListItemsGet()
        {
            return await AjaxHelper.GetAsync(m => this.domain.MaterialColourListItemsGet());
        }

        [HttpGet]
        public async Task<AjaxModel<List<MaterialColourModel>>> MaterialColoursGet()
        {
            return await AjaxHelper.GetDashboardAsync(m => this.domain.MaterialColoursGet(), this.dashboardDomain, this.widgetDomain);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> MaterialColourAdd([FromBody] MaterialColourModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.MaterialColourSave(model), QuarryMessages.MaterialColourSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> MaterialColourUpdate([FromBody] MaterialColourModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.MaterialColourSave(model), QuarryMessages.MaterialColourSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> MaterialColourDelete([FromBody] int materialColourId)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.MaterialColourDelete(materialColourId), QuarryMessages.MaterialColourDeleteSuccess);
        }

        // Product Type section
        [HttpGet]
        public async Task<AjaxModel<List<ProductTypeModel>>> ProductTypeListGet()
        {
            return await AjaxHelper.GetAsync(m => this.domain.ProductTypesGet());
        }

        [HttpGet]
        public async Task<AjaxModel<List<ProductTypeModel>>> ProductTypesGet()
        {
            return await AjaxHelper.GetDashboardAsync(m => this.domain.ProductTypesGet(), this.dashboardDomain, this.widgetDomain);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ProductTypeAdd([FromBody] ProductTypeModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.ProductTypeSave(model), QuarryMessages.ProductTypeSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ProductTypeUpdate([FromBody] ProductTypeModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.ProductTypeSave(model), QuarryMessages.ProductTypeSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ProductTypeDelete([FromBody] int productTypeId)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.ProductTypeDelete(productTypeId), QuarryMessages.ProductTypeDeleteSuccess);
        }

        // Texture section
        [HttpGet]
        public async Task<AjaxModel<List<TextureModel>>> TexturesGet()
        {
            return await AjaxHelper.GetAsync(m => this.domain.TexturesGet());
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> TextureAdd([FromBody] TextureModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.TextureSave(model), QuarryMessages.TextureSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> TextureUpdate([FromBody] TextureModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.TextureSave(model), QuarryMessages.TextureSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> TextureDelete([FromBody] int productTypeId)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.TextureDelete(productTypeId), QuarryMessages.TextureDeleteSuccess);
        }

        // Quarry section
        [HttpGet]
        public async Task<AjaxModel<List<QuarryModel>>> QuarriesGet()
        {
            return await AjaxHelper.GetDashboardAsync(m => this.domain.QuarriesGet(), this.dashboardDomain, this.widgetDomain);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> QuarryAdd([FromBody] QuarryModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.QuarrySave(model), QuarryMessages.QuarrySaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> QuarryUpdate([FromBody] QuarryModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.QuarrySave(model), QuarryMessages.QuarrySaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> QuarryDelete([FromBody] int quarryId)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.QuarryDelete(quarryId), QuarryMessages.QuarryDeleteSuccess);
        }

        // Yard section
        [HttpGet]
        public async Task<AjaxModel<List<YardModel>>> YardListGet()
        {
            return await AjaxHelper.GetAsync(m => this.domain.YardsGet());
        }

        [HttpGet]
        public async Task<AjaxModel<List<YardModel>>> YardsGet()
        {
            return await AjaxHelper.GetDashboardAsync(m => this.domain.YardsGet(), this.dashboardDomain, this.widgetDomain);
        }

        [HttpGet]
        public async Task<AjaxModel<List<YardModel>>> GroupYardsGet()
        {
            return await AjaxHelper.GetAsync(async (m) =>
                                        {
                                            AccountDomain accountDomain = this.HttpContext.RequestServices.GetRequiredService<AccountDomain>();
                                            var companies = await accountDomain.GetGroupCompanyIds();
                                            return await this.domain.YardsGet(companies);
                                        });
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> YardAdd([FromBody] YardModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.YardSave(model), QuarryMessages.YardSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> YardUpdate([FromBody] YardModel model)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.YardSave(model), QuarryMessages.YardSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> YardDelete([FromBody] int yardId)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.YardDelete(yardId), QuarryMessages.YardDeleteSuccess);
        }

        // Material section
        [HttpGet]
        public async Task<AjaxModel<MaterialViewModel>> MaterialViewModelGet()
        {
            return await AjaxHelper.GetAsync(m => this.domain.MaterialViewModelGet());
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> MaterialSave([FromBody] List<MaterialModel> models)
        {
            return await AjaxHelper.SaveAsync(m => this.domain.MaterialSave(models), QuarryMessages.MaterialSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> MaterialDelete(int materialId, int yardId)
        {
            return await AjaxHelper.SaveGetAsync(m => this.domain.MaterialDelete(materialId, yardId), QuarryMessages.MaterialDeleteSuccess);
        }

        // Stock & Material Movement section
        [HttpGet]
        public async Task<AjaxModel<List<StockModel>>> StockGet(int yardId)
        {
            return await AjaxHelper.GetAsync(m => this.domain.StockGet(yardId));
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> MoveMaterial([FromBody] MaterialMovementModel model)
        {
            return await AjaxHelper.SaveGetAsync(m => this.domain.MoveMaterial(model), QuarryMessages.MaterialMovementSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> MaterialUpdate([FromBody] MaterialModel model, int yardId)
        {
            return await AjaxHelper.SaveGetAsync(m => this.domain.MaterialUpdate(model, yardId), QuarryMessages.MaterialUpdateSuccess);
        }

        // Reports section
        [HttpPost]
        public async Task<AjaxModel<string>> QuarrySummary([FromBody] QuarrySummarySearchModel search)
        {
            return await AjaxHelper.GetAsync(m => this.domain.QuarrySummary(search));
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> QuarrySummaryDetails([FromBody] QuarrySummarySearchModel search)
        {
            return await AjaxHelper.GetAsync(m => this.domain.QuarrySummaryDetails(search));
        }

        // product summary
        [HttpGet]
        public async Task<AjaxModel<ProductSummaryViewModel>> ProductSummary()
        {
            return await AjaxHelper.GetAsync(m => this.domain.ProductSummary());
        }

        [HttpPost]
        public async Task<AjaxModel<List<ProductSummaryModel>>> ProductSummarySearch([FromBody] ProductSummarySearchModel search)
        {
            return await AjaxHelper.GetAsync(m => this.domain.ProductSummarySearch(search));
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> ProductSummaryDetails([FromBody] ProductSummarySearchModel search)
        {
            return await AjaxHelper.GetAsync(m => this.domain.ProductSummaryDetails(search));
        }
    }
}
