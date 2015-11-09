using eMine.Lib.Domain;
using eMine.Lib.Shared;
using eMine.Models.Quarry;
using eMine.Models.Shared;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Controllers
{
    public class QuarryController
    {
        private QuarryDomain domain;
        public QuarryController(QuarryDomain domain)
        {
            this.domain = domain;
        }

        #region Material Colour
        [HttpGet]
        public async Task<AjaxModel<List<MaterialColourModel>>> MaterialColoursGet()
        {
            return await AjaxHelper.GetAsync(m => domain.MaterialColoursGet());
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> MaterialColourAdd([FromBody] MaterialColourModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.MaterialColourSave(model), Messages.Quarry.MaterialColourSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> MaterialColourUpdate([FromBody] MaterialColourModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.MaterialColourSave(model), Messages.Quarry.MaterialColourSaveSuccess);
        }
        #endregion

        #region Product Type
        [HttpGet]
        public async Task<AjaxModel<List<ProductTypeModel>>> ProductTypesGet()
        {
            return await AjaxHelper.GetAsync(m => domain.ProductTypesGet());
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> ProductTypeAdd([FromBody] ProductTypeModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.ProductTypeSave(model), Messages.Quarry.ProductTypeSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> ProductTypeUpdate([FromBody] ProductTypeModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.ProductTypeSave(model), Messages.Quarry.ProductTypeSaveSuccess);
        }
        #endregion

        #region Quarry
        [HttpGet]
        public async Task<AjaxModel<List<QuarryModel>>> QuarriesGet()
        {
            return await AjaxHelper.GetAsync(m => domain.QuarriesGet());
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> QuarryAdd([FromBody] QuarryModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.QuarrySave(model), Messages.Quarry.QuarrySaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> QuarryUpdate([FromBody] QuarryModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.QuarrySave(model), Messages.Quarry.QuarrySaveSuccess);
        }
        #endregion

        #region Yard
        [HttpGet]
        public async Task<AjaxModel<List<YardModel>>> YardsGet()
        {
            return await AjaxHelper.GetAsync(m => domain.YardsGet());
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> YardAdd([FromBody] YardModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.YardSave(model), Messages.Quarry.YardSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> YardUpdate([FromBody] YardModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.YardSave(model), Messages.Quarry.YardSaveSuccess);
        }
        #endregion

        #region Material

        [HttpGet]
        public async Task<AjaxModel<MaterialViewModel>> MaterialViewModelGet()
        {
            return await AjaxHelper.GetAsync(m => domain.MaterialViewModelGet());
        }

        [HttpPost]
        public async Task<AjaxModel<EmptyModel>> MaterialSave([FromBody] List<MaterialModel> models)
        {
            return await AjaxHelper.SaveAsync(m => domain.MaterialSave(models), Messages.Quarry.MaterialSaveSuccess);
        }

        #endregion

        #region Stock & Material Movement

        [HttpGet]
        public async Task<AjaxModel<List<StockModel>>> StockGet(int yardId)
        {
            return await AjaxHelper.GetAsync(m => domain.StockGet(yardId));
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> MoveMaterial([FromBody] MaterialMovementModel model)
        {
            return await AjaxHelper.SaveGetAsync(m => domain.MoveMaterial(model), Messages.Quarry.MaterialMovementSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> MaterialUpdate([FromBody] MaterialModel model, int yardId)
        {
            return await AjaxHelper.SaveGetAsync(m => domain.MaterialUpdate(model, yardId), Messages.Quarry.MaterialUpdateSuccess);
        }

        #endregion

        #region Reports
        //reports
        [HttpPost]
        public async Task<AjaxModel<string>> QuarrySummary([FromBody] QuarrySummarySearchModel search)
        {
            return await AjaxHelper.GetAsync(m => domain.QuarrySummary(search));
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> QuarrySummaryDetails([FromBody] QuarrySummarySearchModel search)
        {
            return await AjaxHelper.GetAsync(m => domain.QuarrySummaryDetails(search));
        }

        [HttpPost]
        public async Task<AjaxModel<List<ProductSummaryModel>>> ProductSummary([FromBody] ProductSummarySearchModel search)
        {
            return await AjaxHelper.GetAsync(m => domain.ProductSummary(search));
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> ProductSummaryDetails([FromBody] ProductSummarySearchModel search)
        {
            return await AjaxHelper.GetAsync(m => domain.ProductSummaryDetails(search));
        }

        #endregion
    }
}
