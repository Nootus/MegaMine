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


    }
}
