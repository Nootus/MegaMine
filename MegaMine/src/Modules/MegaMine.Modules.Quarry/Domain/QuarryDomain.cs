//-------------------------------------------------------------------------------------------------
// <copyright file="QuarryDomain.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Business logic or pass through DB Layer
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Domain
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using MegaMine.Core.Models;
    using MegaMine.Modules.Quarry.Models;
    using MegaMine.Modules.Quarry.Repositories;

    public class QuarryDomain
    {
        private QuarryRepository quarryRepository;

        public QuarryDomain(QuarryRepository quarryRepository)
        {
            this.quarryRepository = quarryRepository;
        }

        // Material Colour section
        public async Task<List<ListItem<int, string>>> MaterialColourListItemsGet()
        {
            return await this.quarryRepository.MaterialColourListItemsGet();
        }

        public async Task<List<MaterialColourModel>> MaterialColoursGet()
        {
            return await this.quarryRepository.MaterialColoursGet();
        }

        public async Task MaterialColourSave(MaterialColourModel model)
        {
            await this.quarryRepository.MaterialColourSave(model);
        }

        public async Task MaterialColourDelete(int materialColourId)
        {
            await this.quarryRepository.MaterialColourDelete(materialColourId);
        }

        // Product Type section
        public async Task<List<ProductTypeModel>> ProductTypesGet()
        {
            return await this.quarryRepository.ProductTypesGet();
        }

        public async Task ProductTypeSave(ProductTypeModel model)
        {
            await this.quarryRepository.ProductTypeSave(model);
        }

        public async Task ProductTypeDelete(int productTypeId)
        {
            await this.quarryRepository.ProductTypeDelete(productTypeId);
        }

        // Texture section
        public async Task<List<TextureModel>> TexturesGet()
        {
            return await this.quarryRepository.TexturesGet();
        }

        public async Task TextureSave(TextureModel model)
        {
            await this.quarryRepository.TextureSave(model);
        }

        public async Task TextureDelete(int textureId)
        {
            await this.quarryRepository.TextureDelete(textureId);
        }

        // Quarry section
        public async Task<List<QuarryModel>> QuarriesGet()
        {
            return await this.quarryRepository.QuarriesGet();
        }

        public async Task QuarrySave(QuarryModel model)
        {
            await this.quarryRepository.QuarrySave(model);
        }

        public async Task QuarryDelete(int quarryId)
        {
            await this.quarryRepository.QuarryDelete(quarryId);
        }

        // Yards section
        public async Task<List<YardModel>> YardsGet()
        {
            return await this.quarryRepository.YardsGet();
        }

        public async Task<List<YardModel>> YardsGet(int[] companies)
        {
            return await this.quarryRepository.YardsGet(companies);
        }

        public async Task YardSave(YardModel model)
        {
            await this.quarryRepository.YardSave(model);
        }

        public async Task YardDelete(int yardId)
        {
            await this.quarryRepository.YardDelete(yardId);
        }

        // Material section
        public async Task<MaterialViewModel> MaterialViewModelGet()
        {
            return await this.quarryRepository.MaterialViewModelGet();
        }

        public async Task MaterialSave(List<MaterialModel> models)
        {
            await this.quarryRepository.MaterialSave(models);
        }

        public async Task<List<StockModel>> MaterialDelete(int materialId, int yardId)
        {
            await this.quarryRepository.MaterialDelete(materialId);
            return await this.StockGet(yardId);
        }

        // stockyard section
        public async Task<List<StockModel>> StockGet(int yardId)
        {
            return await this.quarryRepository.StockGet(yardId);
        }

        public async Task<List<StockModel>> MoveMaterial(MaterialMovementModel model)
        {
            return await this.quarryRepository.MoveMaterial(model);
        }

        public async Task<List<StockModel>> MaterialUpdate(MaterialModel model, int yardId)
        {
            await this.quarryRepository.MaterialUpdate(model);
            return await this.StockGet(yardId);
        }

        // Reports section
        public async Task<string> QuarrySummary(QuarrySummarySearchModel search)
        {
            return await this.quarryRepository.QuarrySummary(search);
        }

        public async Task<List<StockModel>> QuarrySummaryDetails(QuarrySummarySearchModel search)
        {
            return await this.quarryRepository.QuarrySummaryDetails(search);
        }

        public async Task<ProductSummaryViewModel> ProductSummary()
        {
            return new ProductSummaryViewModel()
            {
                ProductTypes = await this.quarryRepository.ProductTypeListItemsGet(),
                Quarries = await this.quarryRepository.QuarryListItemsGet(),
                Colours = await this.quarryRepository.MaterialColourListItemsGet(),
                Summary = await this.quarryRepository.ProductSummarySearch(new ProductSummarySearchModel())
            };
        }

        public async Task<List<ProductSummaryModel>> ProductSummarySearch(ProductSummarySearchModel search)
        {
            return await this.quarryRepository.ProductSummarySearch(search);
        }

        public async Task<List<StockModel>> ProductSummaryDetails(ProductSummarySearchModel search)
        {
            return await this.quarryRepository.ProductSummaryDetails(search);
        }
    }
}
