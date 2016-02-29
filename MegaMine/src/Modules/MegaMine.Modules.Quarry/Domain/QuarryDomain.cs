using MegaMine.Modules.Quarry.Models;
using MegaMine.Modules.Quarry.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MegaMine.Modules.Quarry.Domain
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
        public async Task MaterialColourDelete(int materialColourId)
        {
            await quarryRepository.MaterialColourDelete(materialColourId);
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
        public async Task ProductTypeDelete(int productTypeId)
        {
            await quarryRepository.ProductTypeDelete(productTypeId);
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
        public async Task QuarryDelete(int quarryId)
        {
            await quarryRepository.QuarryDelete(quarryId);
        }
        #endregion

        #region Yard
        //Yards
        public async Task<List<YardModel>> YardsGet()
        {
            return await quarryRepository.YardsGet();
        }

        public async Task<List<YardModel>> YardsGet(int[] companies)
        {
            return await quarryRepository.YardsGet(companies);
        }

        public async Task YardSave(YardModel model)
        {
            await quarryRepository.YardSave(model);
        }
        public async Task YardDelete(int yardId)
        {
            await quarryRepository.YardDelete(yardId);
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

        public async Task<List<StockModel>> MaterialDelete(int materialId, int yardId)
        {
            await quarryRepository.MaterialDelete(materialId);
            return await StockGet(yardId);
        }
        #endregion 

        #region Stockyard

        public async Task<List<StockModel>> StockGet(int yardId)
        {
            return await quarryRepository.StockGet(yardId);
        }

        public async Task<List<StockModel>> MoveMaterial(MaterialMovementModel model)
        {
            return await quarryRepository.MoveMaterial(model);
        }

        public async Task<List<StockModel>> MaterialUpdate(MaterialModel model, int yardId)
        {
            await quarryRepository.MaterialUpdate(model);
            return await StockGet(yardId);
        }

        #endregion

        #region Reports
        public async Task<string> QuarrySummary(QuarrySummarySearchModel search)
        {
            return await quarryRepository.QuarrySummary(search);
        }

        public async Task<List<StockModel>> QuarrySummaryDetails(QuarrySummarySearchModel search)
        {
            return await quarryRepository.QuarrySummaryDetails(search);
        }

        public async Task<ProductSummaryViewModel> ProductSummary()
        {
            return new ProductSummaryViewModel()
            {
                ProductTypes = await quarryRepository.ProductTypeListItemGet(),
                Quarries = await quarryRepository.QuarryListItemGet(),
                Summary = await quarryRepository.ProductSummarySearch(new ProductSummarySearchModel())
            };
        }


        public async Task<List<ProductSummaryModel>> ProductSummarySearch(ProductSummarySearchModel search)
        {
            return await quarryRepository.ProductSummarySearch(search);
        }

        public async Task<List<StockModel>> ProductSummaryDetails(ProductSummarySearchModel search)
        {
            return await quarryRepository.ProductSummaryDetails(search);
        }

        #endregion

    }
}
