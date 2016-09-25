//-------------------------------------------------------------------------------------------------
// <copyright file="QuarryRepository.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Quarry related database operations
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Modules.Quarry.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using AutoMapper;
    using MegaMine.Core.Models;
    using MegaMine.Core.Repositories;
    using MegaMine.Modules.Quarry.Entities;
    using MegaMine.Modules.Quarry.Models;
    using Microsoft.EntityFrameworkCore;

    public class QuarryRepository : BaseRepository<QuarryDbContext>
    {
        public QuarryRepository(QuarryDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        // MaterialColour
        public async Task<List<ListItem<int, string>>> MaterialColourListItemsGet()
        {
            return await this.GetListItemsAsync<MaterialColourEntity>(e => new ListItem<int, string> { Key = e.MaterialColourId, Item = e.ColourName }, s => s.ColourName);
        }

        public async Task<List<MaterialColourModel>> MaterialColoursGet()
        {
            return await this.GetListAsync<MaterialColourEntity, MaterialColourModel>(s => s.ColourName);
        }

        public async Task MaterialColourSave(MaterialColourModel model)
        {
            await this.SaveEntity<MaterialColourEntity, MaterialColourModel>(model);
        }

        public async Task MaterialColourDelete(int materialColourId)
        {
            await this.DeleteEntity<MaterialColourEntity>(materialColourId);
        }

        // ProductType
        public async Task<List<ProductTypeModel>> ProductTypesGet()
        {
            return await this.GetListAsync<ProductTypeEntity, ProductTypeModel>(s => s.ProductTypeName);
        }

        public async Task<List<ListItem<int, string>>> ProductTypeListItemsGet()
        {
            return await this.GetListItemsAsync<ProductTypeEntity>(e => new ListItem<int, string> { Key = e.ProductTypeId, Item = e.ProductTypeName }, s => s.ProductTypeName);
        }

        public async Task ProductTypeSave(ProductTypeModel model)
        {
            await this.SaveEntity<ProductTypeEntity, ProductTypeModel>(model);
        }

        public async Task ProductTypeDelete(int productTypeId)
        {
            await this.DeleteEntity<ProductTypeEntity>(productTypeId);
        }

        // Texture
        public async Task<List<TextureModel>> TexturesGet()
        {
            return await this.GetListAsync<TextureEntity, TextureModel>(s => s.TextureName);
        }

        public async Task TextureSave(TextureModel model)
        {
            await this.SaveEntity<TextureEntity, TextureModel>(model);
        }

        public async Task TextureDelete(int textureId)
        {
            await this.DeleteEntity<TextureEntity>(textureId);
        }

        // Quarry
        public async Task<List<ListItem<int, string>>> QuarryListItemsGet()
        {
            return await this.GetListItemsAsync<QuarryEntity>(e => new ListItem<int, string> { Key = e.QuarryId, Item = e.QuarryName }, s => s.QuarryName);
        }

        public async Task<List<QuarryModel>> QuarriesGet()
        {
            var quarry = await this.GetListAsync<QuarryEntity, QuarryModel>(s => s.QuarryName);

            var quarryColours = await (from clr in this.DbContext.QuarryMaterialColours
                                        join mc in this.DbContext.MaterialColours on clr.MaterialColourId equals mc.MaterialColourId
                                       where clr.DeletedInd == false
                                           && clr.CompanyId == this.AppContext.CompanyId
                                       select new { clr.QuarryId, clr.MaterialColourId, mc.ColourName }).ToListAsync();

            quarry.ForEach(q =>
            {
                q.ColourIds = quarryColours.Where(qc => qc.QuarryId == q.QuarryId).Select(qc => qc.MaterialColourId).ToList();
                q.Colours = string.Join(", ", quarryColours.Where(qc => qc.QuarryId == q.QuarryId).Select(qc => qc.ColourName).OrderBy(nm => nm));
            });

            return quarry;
        }

        public async Task QuarryAdd(QuarryModel model)
        {
            QuarryEntity entity = await this.AddEntity<QuarryEntity, QuarryModel>(model, false);

            // adding colours ids
            model.ColourIds.ForEach(cId => this.DbContext.QuarryMaterialColours.Add(new QuarryMaterialColourEntity() { Quarry = entity, MaterialColourId = cId }));

            // adding Yard
            this.DbContext.Yards.Add(new YardEntity() { YardName = model.QuarryName + " Yard", Location = model.Location, Quarry = entity });

            await this.DbContext.SaveChangesAsync();
        }

        public async Task QuarryUpdate(QuarryModel model)
        {
            await this.UpdateEntity<QuarryEntity, QuarryModel>(model, false);

            // getting the existing colours
            List<QuarryMaterialColourEntity> colours = await (from clr in this.DbContext.QuarryMaterialColours where clr.QuarryId == model.QuarryId select clr).ToListAsync();

            // deleting colour ids
            colours.Where(c => !model.ColourIds.Contains(c.MaterialColourId)).ToList().ForEach(ce => this.DbContext.QuarryMaterialColours.Remove(ce));

            // adding colours ids
            model.ColourIds.Except(colours.Select(ce => ce.MaterialColourId)).ToList().ForEach(cId => this.DbContext.QuarryMaterialColours.Add(new QuarryMaterialColourEntity() { QuarryId = model.QuarryId, MaterialColourId = cId }));

            // updating Yard
            YardEntity yard = await (from yd in this.DbContext.Yards where yd.QuarryId == model.QuarryId select yd).SingleAsync();
            yard.Location = model.Location;
            yard.YardName = model.QuarryName + " Yard";
            this.DbContext.Yards.Update(yard);

            await this.DbContext.SaveChangesAsync();
        }

        public async Task QuarrySave(QuarryModel model)
        {
            if (model.QuarryId == 0)
            {
                await this.QuarryAdd(model);
            }
            else
            {
                await this.QuarryUpdate(model);
            }
        }

        public async Task QuarryDelete(int quarryId)
        {
            await this.DeleteEntity<QuarryEntity>(quarryId, false);

            // deleting the YardId
            await this.DeleteEntity<YardEntity>(yd => yd.QuarryId == quarryId, false);

            await this.DbContext.SaveChangesAsync();
        }

        // Yard
        public async Task<List<YardModel>> YardsGet()
        {
            return await this.GetListAsync<YardEntity, YardModel>(s => s.YardName);
        }

        public async Task<List<YardModel>> YardsGet(int[] companies)
        {
            return await this.GetListAsync<YardEntity, YardModel>(e => companies.Contains(e.CompanyId) && e.DeletedInd == false, true, s => s.YardName);
        }

        public async Task YardSave(YardModel model)
        {
            await this.SaveEntity<YardEntity, YardModel>(model);
        }

        public async Task YardDelete(int yardId)
        {
            await this.DeleteEntity<YardEntity>(yardId);
        }

        // Material
        public async Task MaterialSave(List<MaterialModel> models)
        {
            int yardId;

            // getting all the yards
            List<YardModel> yards = await this.YardsGet();

            foreach (var model in models)
            {
                yardId = yards.Where(y => y.QuarryId == model.QuarryId).Select(y => y.YardId).Single();
                model.YardId = yardId;

                MaterialEntity material = Mapper.Map<MaterialModel, MaterialEntity>(model);
                this.DbContext.Materials.Add(material);

                // adding to the Yard
                MaterialMovementEntity movement = new MaterialMovementEntity()
                {
                    Material = material,
                    FromYardId = yardId,
                    ToYardId = yardId,
                    MovementDate = model.MaterialDate,
                    CurrentInd = true
                };

                this.DbContext.MaterialMovements.Add(movement);
            }

            await this.DbContext.SaveChangesAsync();
        }

        public async Task MaterialDelete(int materialId)
        {
            await this.DeleteEntity<MaterialEntity>(materialId);
        }

        public async Task<MaterialViewModel> MaterialViewModelGet()
        {
            MaterialViewModel viewModel = new MaterialViewModel();

            viewModel.MaterialColours = await this.GetListItemsAsync<MaterialColourEntity>(e => new ListItem<int, string> { Key = e.MaterialColourId, Item = e.ColourName }, s => s.ColourName);
            viewModel.ProductTypes = await this.ProductTypesGet();
            viewModel.Quarries = await this.GetListItemsAsync<QuarryEntity>(e => new ListItem<int, string> { Key = e.QuarryId, Item = e.QuarryName }, s => s.QuarryName);
            viewModel.Textures = await this.GetListItemsAsync<TextureEntity>(e => new ListItem<int, string> { Key = e.TextureId, Item = e.TextureName }, s => s.TextureName);
            viewModel.ProcessTypes = await this.GetListItemsAsync<ProcessTypeEntity>(e => new ListItem<int, string> { Key = e.ProcessTypeId, Item = e.ProcessTypeName }, s => s.ProcessTypeName);

            viewModel.Model = new MaterialModel();

            return viewModel;
        }

        // Stock & Move Material
        // Material Movement
        public async Task<List<StockModel>> StockGet(int yardId, int? productTypeId = null, int? materialColourId = null, DateTime? startDate = null, DateTime? endDate = null)
        {
            endDate = endDate == null ? endDate : endDate.Value.AddDays(1).AddSeconds(-1);

            return await this.DbContext.FromSql<StockEntity>(
                                "quarry.StockGet @YardId = {0}, @ProductTypeId = {1}, @MaterialColourId = {2}, @StartDate = {3}, @EndDate = {4}",
                                 yardId,
                                 productTypeId,
                                 materialColourId,
                                 startDate,
                                 endDate)
                                 .Select(m => Mapper.Map<StockEntity, StockModel>(m)).ToListAsync();
        }

        public async Task<List<StockModel>> MoveMaterial(MaterialMovementModel model)
        {
            string ids = string.Join(",", model.MaterialIds);

            var database = this.DbContext.Database;

            await database.BeginTransactionAsync();

            try
            {
                string sql = "update quarry.MaterialMovement set CurrentInd = 0 where MaterialId in (" + ids + ")";
                await this.DbContext.ExecuteSqlCommandAsync(sql);

                // inserting the movement
                sql = "insert into quarry.MaterialMovement(MaterialId, FromYardId, ToYardId, MovementDate, CurrentInd, CreatedUserId, CreatedDate, LastModifiedUserId, LastModifiedDate, DeletedInd, CompanyId) " +
                                " select MaterialId, YardId, @p0, @p1, 1, @p2, @p3, @p4, @p5, 0, @p6 from quarry.Material where MaterialId in (" + ids + ")";

                await this.DbContext.ExecuteSqlCommandAsync(sql, model.ToYardId, model.MovementDate, this.AppContext.UserName, DateTime.UtcNow, this.AppContext.UserName, DateTime.UtcNow, this.AppContext.CompanyId.ToString());

                // setting the YardId for the Material
                sql = "update quarry.Material set YardId = @p0 " +
                        "from quarry.Material m where m.MaterialId in (" + ids + ")";
                await this.DbContext.ExecuteSqlCommandAsync(sql, model.ToYardId);

                database.CommitTransaction();
            }
            catch
            {
                database.RollbackTransaction();
                throw;
            }

            return await this.StockGet(model.FromYardId);
        }

        public async Task MaterialUpdate(MaterialModel model)
        {
            MaterialEntity entity = await this.GetSingleAsync<MaterialEntity>(model.MaterialId);

            if (entity.QuarryId != model.QuarryId)
            {
                // getting the YardId
                List<YardModel> yards = await this.YardsGet();

                int oldYardId = yards.Single(y => y.QuarryId == entity.QuarryId).YardId;
                int newYardId = yards.Single(y => y.QuarryId == model.QuarryId).YardId;

                // updating the movement records
                List<MaterialMovementEntity> movementEntites = await (from me in this.DbContext.MaterialMovements where me.MaterialId == model.MaterialId && me.FromYardId == oldYardId orderby me.MaterialMovementId select me).Take(2).ToListAsync();

                // updating the first record
                bool intiallyMoved = false;
                for (int counter = 0; counter < movementEntites.Count; counter++)
                {
                    if (counter == 0)
                    {
                        movementEntites[counter].FromYardId = newYardId;
                        if (movementEntites[counter].ToYardId == oldYardId)
                        {
                            movementEntites[counter].ToYardId = newYardId;
                        }
                        else
                        {
                            intiallyMoved = true;
                        }
                    }
                    else
                    {
                        if (intiallyMoved)
                        {
                            break;
                        }

                        movementEntites[counter].FromYardId = newYardId;
                    }

                    movementEntites[counter].UpdateAuditFields();
                    this.DbContext.MaterialMovements.Update(movementEntites[counter]);
                }

                model.YardId = newYardId;
            }

            Mapper.Map<MaterialModel, MaterialEntity>(model, entity);
            this.DbContext.Materials.Update(entity);
            await this.DbContext.SaveChangesAsync();
        }

        // Reports
        public async Task<string> QuarrySummary(QuarrySummarySearchModel search)
        {
            SqlConnection connection = (SqlConnection)this.DbContext.Database.GetDbConnection();
            connection.Open();
            SqlCommand command = new SqlCommand("quarry.GetQuarrySummary @CompanyId, @StartDate, @EndDate", connection);

            command.Parameters.Add(this.CreateParameter(command, "@CompanyId", DbType.Int32, this.AppContext.CompanyId));
            command.Parameters.Add(this.CreateParameter(command, "@StartDate", DbType.DateTime, search.StartDate));
            command.Parameters.Add(this.CreateParameter(command, "@EndDate", DbType.DateTime, search.EndDate));

            SqlDataReader reader = await command.ExecuteReaderAsync(System.Data.CommandBehavior.CloseConnection);

            StringBuilder builder = new StringBuilder();
            DataTable schema = reader.GetSchemaTable();
            while (await reader.ReadAsync())
            {
                if (builder.Length == 0)
                {
                    builder.Append("[{");
                }
                else
                {
                    builder.Append(",{");
                }

                for (int counter = 0; counter < schema.Rows.Count; counter++)
                {
                    object value = reader[counter];
                    if (counter > 0)
                    {
                        builder.Append(",");
                    }

                    builder.Append(string.Format(@"""{0}"":{1}", schema.Rows[counter]["ColumnName"], value == null || value.ToString() == string.Empty ? "null" : @"""" + value.ToString() + @""""));
                }

                builder.Append("}");
            }

            connection.Close();
            connection.Dispose();
            if (builder.Length > 0)
            {
                builder.Append("]");
            }

            return builder.ToString();
        }

        public async Task<List<StockModel>> QuarrySummaryDetails(QuarrySummarySearchModel search)
        {
            // getting the yardid and then calling the stockget
            YardEntity yard = await (from yd in this.DbContext.Yards where yd.QuarryId == search.QuarryId select yd).SingleAsync();
            return await this.StockGet(yard.YardId, null, null, search.StartDate, search.EndDate);
        }

        public async Task<List<ProductSummaryModel>> ProductSummarySearch(ProductSummarySearchModel search)
        {
            string quarryIds = search.QuarryIds == null || search.QuarryIds.Length == 0 ? null : string.Join(",", search.QuarryIds);
            string productTypeIds = search.ProductTypeIds == null || search.ProductTypeIds.Length == 0 ? null : string.Join(",", search.ProductTypeIds);
            string materialColourIds = search.MaterialColourIds == null || search.MaterialColourIds.Length == 0 ? null : string.Join(",", search.MaterialColourIds);

            return await this.DbContext.FromSql<ProductSummaryEntity>(
                "quarry.ProductSummaryGet @CompanyId = {0}, @QuarryIds = {1}, @ProductTypeIds = {2}, @MaterialColourIds = {3}, @StartDate = {4}, @EndDate = {5}",
                this.AppContext.CompanyId,
                quarryIds,
                productTypeIds,
                materialColourIds,
                search.StartDate,
                search.EndDate)
                .Select(m => Mapper.Map<ProductSummaryEntity, ProductSummaryModel>(m)).ToListAsync();
        }

        public async Task<List<StockModel>> ProductSummaryDetails(ProductSummarySearchModel search)
        {
            // getting the yardid and then calling the stockget
            YardEntity yard = await (from yd in this.DbContext.Yards where yd.QuarryId == search.QuarryIds[0] select yd).SingleAsync();
            return await this.StockGet(yard.YardId, search.ProductTypeIds[0], search.MaterialColourIds[0], search.StartDate, search.EndDate);
        }
    }
}
