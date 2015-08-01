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

    }
}
