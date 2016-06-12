using AutoMapper;
using MegaMine.Core.Models;
using MegaMine.Core.Repositories;
using MegaMine.Modules.Quarry.Models;
using MegaMine.Modules.Quarry.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MegaMine.Modules.Quarry.Repositories
{
    public class QuarryRepository : BaseRepository<QuarryDbContext>
    {
        public QuarryRepository(QuarryDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        #region MaterialColour
        public async Task<List<ListItem<int, string>>> MaterialColourListItemsGet()
        {
            return await GetListItemsAsync<MaterialColourEntity>(e => new ListItem<int, string> { Key = e.MaterialColourId, Item = e.ColourName }, s => s.ColourName);
        }
        public async Task<List<MaterialColourModel>> MaterialColoursGet()
        {
            return await GetListAsync<MaterialColourEntity, MaterialColourModel>(s => s.ColourName);
        }

        public async Task MaterialColourSave(MaterialColourModel model)
        {
            await SaveEntity<MaterialColourEntity, MaterialColourModel>(model);
        }

        public async Task MaterialColourDelete(int materialColourId)
        {
            await DeleteEntity<MaterialColourEntity>(materialColourId);
        }
        #endregion

        #region ProductType
        public async Task<List<ProductTypeModel>> ProductTypesGet()
        {
            return await GetListAsync<ProductTypeEntity, ProductTypeModel>(s => s.ProductTypeName);
        }

        public async Task<List<ListItem<int, string>>> ProductTypeListItemsGet()
        {
            return await GetListItemsAsync<ProductTypeEntity>(e => new ListItem<int, string> { Key = e.ProductTypeId, Item = e.ProductTypeName }, s => s.ProductTypeName);
        }

        public async Task ProductTypeSave(ProductTypeModel model)
        {
            await SaveEntity<ProductTypeEntity, ProductTypeModel>(model);
        }
        public async Task ProductTypeDelete(int productTypeId)
        {
            await DeleteEntity<ProductTypeEntity>(productTypeId);
        }
        #endregion

        #region Quarry
        public async Task<List<ListItem<int, string>>> QuarryListItemsGet()
        {
            return await GetListItemsAsync<QuarryEntity>(e => new ListItem<int, string> { Key = e.QuarryId, Item = e.QuarryName }, s => s.QuarryName);
        }

        public async Task<List<QuarryModel>> QuarriesGet()
        {
            var quarry = await GetListAsync<QuarryEntity, QuarryModel>(s => s.QuarryName);

            var quarryColours = await (from clr in dbContext.QuarryMaterialColours
                                        join mc in dbContext.MaterialColours on clr.MaterialColourId equals mc.MaterialColourId
                                       where clr.DeletedInd == false
                                           && clr.CompanyId == context.CompanyId
                                       select new { clr.QuarryId, clr.MaterialColourId, mc.ColourName }).ToListAsync();


            quarry.ForEach(q => {
                q.ColourIds = quarryColours.Where(qc => qc.QuarryId == q.QuarryId).Select(qc => qc.MaterialColourId).ToList();
                q.Colours = String.Join(", ", quarryColours.Where(qc => qc.QuarryId == q.QuarryId).Select(qc => qc.ColourName).OrderBy(nm => nm));
            });

            return quarry;
        }

        public async Task QuarryAdd(QuarryModel model)
        {
            QuarryEntity entity = await AddEntity<QuarryEntity, QuarryModel>(model, false);

            //adding colours ids
            model.ColourIds.ForEach(cId => dbContext.QuarryMaterialColours.Add(new QuarryMaterialColourEntity() { Quarry = entity, MaterialColourId = cId }));

            //adding Yard
            dbContext.Yards.Add(new YardEntity() { YardName = model.QuarryName + " Yard", Location = model.Location, Quarry = entity });

            await dbContext.SaveChangesAsync();

        }

        public async Task QuarryUpdate(QuarryModel model)
        {
            await UpdateEntity<QuarryEntity, QuarryModel>(model, false);

            //getting the existing colours
            List<QuarryMaterialColourEntity> colours = await (from clr in dbContext.QuarryMaterialColours where clr.QuarryId == model.QuarryId select clr).ToListAsync();

            //deleting colour ids
            colours.Where(c => !model.ColourIds.Contains(c.MaterialColourId)).ToList().ForEach(ce => dbContext.QuarryMaterialColours.Remove(ce));

            //adding colours ids
            model.ColourIds.Except(colours.Select(ce => ce.MaterialColourId)).ToList().ForEach(cId => dbContext.QuarryMaterialColours.Add(new QuarryMaterialColourEntity() { QuarryId = model.QuarryId, MaterialColourId = cId }));

            //updating Yard
            YardEntity yard = await (from yd in dbContext.Yards where yd.QuarryId == model.QuarryId select yd).SingleAsync();
            yard.Location = model.Location;
            yard.YardName = model.QuarryName + " Yard";
            dbContext.Yards.Update(yard);

            await dbContext.SaveChangesAsync();
        }

        public async Task QuarrySave(QuarryModel model)
        {
            if (model.QuarryId == 0)
            {
                await QuarryAdd(model);
            }
            else
            {
                await QuarryUpdate(model);
            }
        }

        public async Task QuarryDelete(int quarryId)
        {
            await DeleteEntity<QuarryEntity>(quarryId, false);

            //deleting the YardId
            await DeleteEntity<YardEntity>(yd => yd.QuarryId == quarryId, false);

            await dbContext.SaveChangesAsync();
        }
        #endregion

        #region Yard
        public async Task<List<YardModel>> YardsGet()
        {
            return (await GetListAsync<YardEntity, YardModel>(s => s.YardName)); //.OrderBy(o => o.QuarryId).ToList();
        }

        public async Task<List<YardModel>> YardsGet(int[] companies)
        {
            return await GetListAsync<YardEntity, YardModel>(e => companies.Contains(e.CompanyId) && e.DeletedInd == false, true, s => s.YardName);
        }

        public async Task YardSave(YardModel model)
        {
            await SaveEntity<YardEntity, YardModel>(model);
        }
        public async Task YardDelete(int yardId)
        {
            await DeleteEntity<YardEntity>(yardId);
        }
        #endregion

        #region Material

        public async Task MaterialSave(List<MaterialModel> models)
        {
            int yardId;
            //getting all the yards
            List<YardModel> yards = await YardsGet();

            foreach(var model in models)
            {
                yardId = yards.Where(y => y.QuarryId == model.QuarryId).Select(y => y.YardId).Single();
                model.YardId = yardId;

                MaterialEntity material = Mapper.Map<MaterialModel, MaterialEntity>(model);
                dbContext.Materials.Add(material);

                //adding to the Yard
                MaterialMovementEntity movement = new MaterialMovementEntity()
                {
                    Material = material,
                    FromYardId = yardId,
                    ToYardId = yardId,
                    MovementDate = model.MaterialDate,
                    CurrentInd = true
                };

                dbContext.MaterialMovements.Add(movement);
            }

            await dbContext.SaveChangesAsync();
        }

        public async Task MaterialDelete(int materialId)
        {
            await DeleteEntity<MaterialEntity>(materialId);
        }

        public async Task<MaterialViewModel> MaterialViewModelGet()
        {
            MaterialViewModel viewModel = new MaterialViewModel();

            viewModel.MaterialColour = await GetListItemsAsync<MaterialColourEntity>(e => new ListItem<int, string> { Key = e.MaterialColourId, Item = e.ColourName }, s => s.ColourName);
            viewModel.ProductType = await ProductTypesGet();
            viewModel.Quarry = await GetListItemsAsync<QuarryEntity>(e => new ListItem<int, string> { Key = e.QuarryId, Item = e.QuarryName }, s => s.QuarryName);

            viewModel.Model = new MaterialModel();

            return viewModel;
        }

        #endregion

        #region Stock & Move Material
        //Material Movement
        public async Task<List<StockModel>> StockGet(int yardId, int? productTypeId = null, int? materialColourId = null, DateTime? startDate = null, DateTime? endDate = null)
        {
            endDate = endDate == null ? endDate : endDate.Value.AddDays(1).AddSeconds(-1);

            //Due to bug in RC2 changing the below LINQ to Stored proc

            //var query = from mt in dbContext.Materials
            //            join qry in dbContext.Quarries on mt.QuarryId equals qry.QuarryId
            //            join pt in dbContext.ProductTypes on mt.ProductTypeId equals pt.ProductTypeId
            //            join mc in dbContext.MaterialColours on mt.MaterialColourId equals mc.MaterialColourId
            //            where mt.DeletedInd == false
            //             && mt.YardId == yardId
            //             && (productTypeId == null || pt.ProductTypeId == productTypeId)
            //             && (materialColourId == null || mc.MaterialColourId == materialColourId)
            //             && (startDate == null || mt.MaterialDate >= startDate)
            //             && (endDate == null || mt.MaterialDate <= endDate)
            //            select new StockModel()
            //            {
            //                Quarry = qry.QuarryName,
            //                ProductType = pt.ProductTypeName,
            //                MaterialColour = mc.ColourName,
            //                MaterialId = mt.MaterialId,
            //                BlockNumber = mt.BlockNumber,
            //                QuarryId = mt.QuarryId,
            //                YardId = mt.YardId,
            //                ProductTypeId = mt.ProductTypeId,
            //                MaterialColourId = mt.MaterialColourId,
            //                Dimensions = mt.Dimensions,
            //                Length = mt.Length,
            //                Width = mt.Width,
            //                Height = mt.Height,
            //                Weight = mt.Weight,
            //                MaterialDate = mt.MaterialDate
            //            };


            //return await query.ToListAsync();


            return await dbContext.Set<StockEntity>().FromSql("quarry.StockGet @YardId = {0}, @ProductTypeId = {1}, @MaterialColourId = {2}, @StartDate = {3}, @EndDate = {4}"
                                 , yardId, productTypeId, materialColourId, startDate, endDate
                                 ).Select(m => Mapper.Map<StockEntity, StockModel>(m)).ToListAsync();
        }

        public async Task<List<StockModel>> MoveMaterial(MaterialMovementModel model)
        {
            string ids = String.Join(",", model.MaterialMovementIds);

            var database = dbContext.Database;

            await database.BeginTransactionAsync();

            try
            {
                //inserting the movement
                string sql = "insert into quarry.MaterialMovement(MaterialId, FromYardId, ToYardId, MovementDate, CurrentInd, CreatedUserId, CreatedDate, LastModifiedUserId, LastModifiedDate, DeletedInd, CompanyId) " +
                                " select MaterialId, ToYardId, @p0, @p1, 1, @p2, @p3, @p4, @p5, 0, @p6 from quarry.MaterialMovement where MaterialMovementId in (" + ids + ")";

                database.ExecuteSqlCommand(sql, model.ToYardId, model.MovementDate, context.UserName, DateTime.UtcNow, context.UserName, DateTime.UtcNow, context.CompanyId.ToString());

                sql = "update quarry.MaterialMovement set CurrentInd = 0 where MaterialMovementId in (" + ids + ")";
                database.ExecuteSqlCommand(sql);

                //setting the YardId for the Material
                sql = "update quarry.Material set YardId = @p0 " +
                        "from quarry.Material m join quarry.MaterialMovement mm on m.MaterialId = mm.MaterialId where mm.MaterialMovementId in (" + ids + ")";
                database.ExecuteSqlCommand(sql, model.ToYardId);

                database.CommitTransaction();
            }
            catch
            {
                database.RollbackTransaction();
                throw;
            }

            return await StockGet(model.FromYardId);
        }

        public async Task MaterialUpdate(MaterialModel model)
        {
            MaterialEntity entity = await GetSingleAsync<MaterialEntity>(model.MaterialId);

            if (entity.QuarryId != model.QuarryId)
            {
                //getting the YardId
                List<YardModel> yards = await YardsGet();

                int oldYardId = yards.Single(y => y.QuarryId == entity.QuarryId).YardId;
                int newYardId = yards.Single(y => y.QuarryId == model.QuarryId).YardId;
                //updating the movement records
                List<MaterialMovementEntity> movementEntites = await (from me in dbContext.MaterialMovements where me.MaterialId == model.MaterialId && me.FromYardId == oldYardId orderby me.MaterialMovementId select me).Take(2).ToListAsync();

                //updating the first record
                bool intiallyMoved = false;
                for (int counter = 0; counter < movementEntites.Count; counter++)
                {
                    if(counter == 0)
                    {
                        movementEntites[counter].FromYardId = newYardId;
                        if(movementEntites[counter].ToYardId == oldYardId)
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
                            break;
                        movementEntites[counter].FromYardId = newYardId;
                    }
                    movementEntites[counter].UpdateAuditFields();
                    dbContext.MaterialMovements.Update(movementEntites[counter]);
                }

                model.YardId = newYardId;
            }

            Mapper.Map<MaterialModel, MaterialEntity>(model, entity);
            dbContext.Materials.Update(entity);
            await dbContext.SaveChangesAsync();

        }

        #endregion

        #region Reports

        private SqlParameter CreateParameter(SqlCommand command, string parameterName, DbType type, object value)
        {
            SqlParameter parameter = command.CreateParameter();
            parameter.ParameterName = parameterName;
            parameter.DbType = type;
            parameter.Value = value == null ? DBNull.Value : value;
            return parameter;
        }

        public async Task<string> QuarrySummary(QuarrySummarySearchModel search)
        {
            SqlConnection connection = (SqlConnection)dbContext.Database.GetDbConnection();
            connection.Open();
            SqlCommand command = new SqlCommand("quarry.GetQuarrySummary @CompanyId, @StartDate, @EndDate", connection);

            command.Parameters.Add(CreateParameter(command, "@CompanyId", DbType.Int32, context.CompanyId));
            command.Parameters.Add(CreateParameter(command, "@StartDate", DbType.DateTime, search.StartDate));
            command.Parameters.Add(CreateParameter(command, "@EndDate", DbType.DateTime, search.EndDate));

            SqlDataReader reader = await command.ExecuteReaderAsync(System.Data.CommandBehavior.CloseConnection);

            StringBuilder builder = new StringBuilder();
            DataTable schema = reader.GetSchemaTable();
            while (await reader.ReadAsync())
            {
                if(builder.Length == 0)
                {
                    builder.Append("[{");
                }
                else
                {
                    builder.Append(",{");
                }
                for(int counter = 0; counter < schema.Rows.Count; counter++)
                {
                    object value = reader[counter];
                    if (counter > 0)
                        builder.Append(",");
                    builder.Append(String.Format(@"""{0}"":{1}", schema.Rows[counter]["ColumnName"], value == null || value.ToString() == "" ? "null" : @"""" + value.ToString() + @""""));
                }
                builder.Append("}");
            }
            connection.Close();
            connection.Dispose();
            if(builder.Length > 0)
                builder.Append("]");

            return builder.ToString();
        }

        public async Task<List<StockModel>> QuarrySummaryDetails(QuarrySummarySearchModel search)
        {
            //getting the yardid and then calling the stockget
            YardEntity yard = await (from yd in dbContext.Yards where yd.QuarryId == search.QuarryId select yd).SingleAsync();
            return await StockGet(yard.YardId, null, null, search.StartDate, search.EndDate);
        }

        public async Task<List<ProductSummaryModel>> ProductSummarySearch(ProductSummarySearchModel search)
        {
            string quarryIds = search.QuarryIds == null || search.QuarryIds.Length == 0 ? null : String.Join(",", search.QuarryIds);
            string productTypeIds = search.ProductTypeIds == null || search.ProductTypeIds.Length == 0 ? null : String.Join(",", search.ProductTypeIds);
            string materialColourIds = search.MaterialColourIds == null || search.MaterialColourIds.Length == 0 ? null : String.Join(",", search.MaterialColourIds);

            return await dbContext.Set<ProductSummaryEntity>().FromSql("quarry.ProductSummaryGet @CompanyId = {0}, @QuarryIds = {1}, @ProductTypeIds = {2}, @MaterialColourIds = {3}, @StartDate = {4}, @EndDate = {5}"
                                 , context.CompanyId, quarryIds, productTypeIds, materialColourIds, search.StartDate, search.EndDate
                                 ).Select(m => Mapper.Map<ProductSummaryEntity, ProductSummaryModel>(m)).ToListAsync();
        }

        public async Task<List<StockModel>> ProductSummaryDetails(ProductSummarySearchModel search)
        {
            //getting the yardid and then calling the stockget
            YardEntity yard = await (from yd in dbContext.Yards where yd.QuarryId == search.QuarryIds[0] select yd).SingleAsync();
            return await StockGet(yard.YardId, search.ProductTypeIds[0], search.MaterialColourIds[0], search.StartDate, search.EndDate);
        }

        #endregion
    }
}
