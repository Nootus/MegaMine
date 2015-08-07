using eMine.Lib.Repositories;
using eMine.Models.Quarry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Domain
{
    public class QuarryDomain
    {
        private QuarryRepository quarryRepository;
        public QuarryDomain(QuarryRepository quarryRepository)
        {
            this.quarryRepository = quarryRepository;
        }

        #region Material Colour
        //Material Colour
        public async Task<List<MaterialColourModel>> MaterialColoursGet()
        {
            return await quarryRepository.MaterialColoursGet();
        }

        public async Task MaterialColourSave(MaterialColourModel model)
        {
            await quarryRepository.MaterialColourSave(model);
        }
        #endregion

        #region Product Type
        //Product Type
        public async Task<List<ProductTypeModel>> ProductTypesGet()
        {
            return await quarryRepository.ProductTypesGet();
        }

        public async Task ProductTypeSave(ProductTypeModel model)
        {
            await quarryRepository.ProductTypeSave(model);
        }
        #endregion

        #region Quarry
        //Quarry
        public async Task<List<QuarryModel>> QuarriesGet()
        {
            return await quarryRepository.QuarriesGet();
        }

        public async Task QuarrySave(QuarryModel model)
        {
            await quarryRepository.QuarrySave(model);
        }
        #endregion

        #region Yard
        //Yards
        public async Task<List<YardModel>> YardsGet()
        {
            return await quarryRepository.YardsGet();
        }

        public async Task YardSave(YardModel model)
        {
            await quarryRepository.YardSave(model);
        }
        #endregion

        #region Material

        public async Task<MaterialViewModel> MaterialViewModelGet()
        {
            return await quarryRepository.MaterialViewModelGet();
        }

        public async Task MaterialSave(List<MaterialModel> models)
        {
            await quarryRepository.MaterialSave(models);
        }

        #endregion 

        #region Material

        public async Task<List<StockModel>> StockGet(int yardId)
        {
            return await quarryRepository.StockGet(yardId);
        }

        public async Task<List<StockModel>> MoveMaterial(MaterialMovementModel model)
        {
            return await quarryRepository.MoveMaterial(model);
        }

        #endregion 
    }
}
