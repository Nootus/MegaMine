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
            return await AjaxHelper.GetAsync<List<MaterialColourModel>>(m => domain.MaterialColoursGet());
        }

        [HttpPost]
        public async Task<AjaxModel<MaterialColourModel>> MaterialColourAdd([FromBody] MaterialColourModel model)
        {
            return await AjaxHelper.SaveAsync<MaterialColourModel>(m => domain.MaterialColourSave(model), Messages.Quarry.MaterialColourSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<MaterialColourModel>> MaterialColourUpdate([FromBody] MaterialColourModel model)
        {
            return await AjaxHelper.SaveAsync<MaterialColourModel>(m => domain.MaterialColourSave(model), Messages.Quarry.MaterialColourSaveSuccess);
        }
        #endregion

        #region Product Type
        [HttpGet]
        public async Task<AjaxModel<List<ProductTypeModel>>> ProductTypesGet()
        {
            return await AjaxHelper.GetAsync<List<ProductTypeModel>>(m => domain.ProductTypesGet());
        }

        [HttpPost]
        public async Task<AjaxModel<ProductTypeModel>> ProductTypeAdd([FromBody] ProductTypeModel model)
        {
            return await AjaxHelper.SaveAsync<ProductTypeModel>(m => domain.ProductTypeSave(model), Messages.Quarry.ProductTypeSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<ProductTypeModel>> ProductTypeUpdate([FromBody] ProductTypeModel model)
        {
            return await AjaxHelper.SaveAsync<ProductTypeModel>(m => domain.ProductTypeSave(model), Messages.Quarry.ProductTypeSaveSuccess);
        }
        #endregion

        #region Quarry
        [HttpGet]
        public async Task<AjaxModel<List<QuarryModel>>> QuarriesGet()
        {
            return await AjaxHelper.GetAsync<List<QuarryModel>>(m => domain.QuarriesGet());
        }

        [HttpPost]
        public async Task<AjaxModel<QuarryModel>> QuarryAdd([FromBody] QuarryModel model)
        {
            return await AjaxHelper.SaveAsync<QuarryModel>(m => domain.QuarrySave(model), Messages.Quarry.QuarrySaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<QuarryModel>> QuarryUpdate([FromBody] QuarryModel model)
        {
            return await AjaxHelper.SaveAsync<QuarryModel>(m => domain.QuarrySave(model), Messages.Quarry.QuarrySaveSuccess);
        }
        #endregion

        #region Yard
        [HttpGet]
        public async Task<AjaxModel<List<YardModel>>> YardsGet()
        {
            return await AjaxHelper.GetAsync<List<YardModel>>(m => domain.YardsGet());
        }

        [HttpPost]
        public async Task<AjaxModel<YardModel>> YardAdd([FromBody] YardModel model)
        {
            return await AjaxHelper.SaveAsync<YardModel>(m => domain.YardSave(model), Messages.Quarry.YardSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<YardModel>> YardUpdate([FromBody] YardModel model)
        {
            return await AjaxHelper.SaveAsync<YardModel>(m => domain.YardSave(model), Messages.Quarry.YardSaveSuccess);
        }
        #endregion

        #region Material

        [HttpGet]
        public async Task<AjaxModel<MaterialViewModel>> MaterialViewModelGet()
        {
            return await AjaxHelper.GetAsync<MaterialViewModel>(m => domain.MaterialViewModelGet());
        }

        [HttpPost]
        public async Task<AjaxModel<List<MaterialModel>>> MaterialSave([FromBody] List<MaterialModel> models)
        {
            return await AjaxHelper.SaveAsync<List<MaterialModel>>(m => domain.MaterialSave(models), Messages.Quarry.MaterialSaveSuccess);
        }

        #endregion

        #region Stock & Material Movement

        [HttpGet]
        public async Task<AjaxModel<List<StockModel>>> StockGet(int yardId)
        {
            return await AjaxHelper.GetAsync<List<StockModel>>(m => domain.StockGet(yardId));
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> MoveMaterial([FromBody] MaterialMovementModel model)
        {
            return await AjaxHelper.SaveGetAsync<List<StockModel>>(m => domain.MoveMaterial(model), Messages.Quarry.MaterialMovementSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> MaterialUpdate([FromBody] MaterialModel model, int yardId)
        {
            return await AjaxHelper.SaveGetAsync<List<StockModel>>(m => domain.MaterialUpdate(model, yardId), Messages.Quarry.MaterialUpdateSuccess);
        }

        [HttpGet]
        public async Task<AjaxModel<List<Dictionary<string, string>>>> Summary()
        {
            return await AjaxHelper.GetAsync<List<Dictionary<string, string>>>(m => domain.Summary());
        }
        #endregion
    }
}
