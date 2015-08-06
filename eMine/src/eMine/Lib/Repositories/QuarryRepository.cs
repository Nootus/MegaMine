using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eMine.Models.Quarry;
using eMine.Lib.Entities.Quarry;
using eMine.Lib.Entities;

using Microsoft.Data.Entity;
using eMine.Lib.Extensions;

namespace eMine.Lib.Repositories
{
    public class QuarryRepository : BaseRepository
    {
        public QuarryRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        #region MaterialColour
        public async Task<List<MaterialColourModel>> MaterialColoursGet()
        {
            var query = from mc in dbContext.MaterialColours
                        where mc.DeletedInd == false
                            && mc.CompanyId == profile.CompanyId
                        orderby mc.ColourName ascending
                        select new MaterialColourModel
                        {
                            MaterialColourId = mc.MaterialColourId,
                            ColourName = mc.ColourName,
                            ColourDescription = mc.ColourDescription

                        };

            return await query.ToListAsync();
        }

        public async Task MaterialColourAdd(MaterialColourModel model)
        {
            MaterialColourEntity entity = new MaterialColourEntity()
            {
                ColourName = model.ColourName,
                ColourDescription = model.ColourDescription
            };
            dbContext.MaterialColours.Add(entity);
            await dbContext.SaveChangesAsync();

        }

        public async Task MaterialColourUpdate(MaterialColourModel model)
        {
            MaterialColourEntity entity = (from mc in dbContext.MaterialColours where mc.MaterialColourId == model.MaterialColourId && mc.CompanyId == profile.CompanyId select mc).First();
            entity.ColourName = model.ColourName;
            entity.ColourDescription = model.ColourDescription;
            entity.UpdateAuditFields();
            dbContext.MaterialColours.Update(entity);
            await dbContext.SaveChangesAsync();

        }

        public async Task MaterialColourSave(MaterialColourModel model)
        {
            if (model.MaterialColourId == 0)
            {
                await MaterialColourAdd(model);
            }
            else
            {
                await MaterialColourUpdate(model);
            }
        }
        #endregion

        #region ProductType
        public async Task<List<ProductTypeModel>> ProductTypesGet()
        {
            var query = from pt in dbContext.ProductTypes
                        where pt.DeletedInd == false
                            && pt.CompanyId == profile.CompanyId
                        orderby pt.ProductTypeName ascending
                        select new ProductTypeModel
                        {
                            ProductTypeId = pt.ProductTypeId,
                            ProductTypeName = pt.ProductTypeName,
                            ProductTypeDescription = pt.ProductTypeDescription

                        };

            return await query.ToListAsync();
        }

        public async Task ProductTypeAdd(ProductTypeModel model)
        {
            ProductTypeEntity entity = new ProductTypeEntity()
            {
                ProductTypeName = model.ProductTypeName,
                ProductTypeDescription = model.ProductTypeDescription
            };
            dbContext.ProductTypes.Add(entity);
            await dbContext.SaveChangesAsync();

        }

        public async Task ProductTypeUpdate(ProductTypeModel model)
        {
            ProductTypeEntity entity = (from pt in dbContext.ProductTypes where pt.ProductTypeId == model.ProductTypeId && pt.CompanyId == profile.CompanyId select pt).First();
            entity.ProductTypeName = model.ProductTypeName;
            entity.ProductTypeDescription = model.ProductTypeDescription;
            entity.UpdateAuditFields();
            dbContext.ProductTypes.Update(entity);
            await dbContext.SaveChangesAsync();

        }

        public async Task ProductTypeSave(ProductTypeModel model)
        {
            if (model.ProductTypeId == 0)
            {
                await ProductTypeAdd(model);
            }
            else
            {
                await ProductTypeUpdate(model);
            }
        }
        #endregion

        #region Quarry
        public async Task<List<QuarryModel>> QuarriesGet()
        {
            var quarry = await (from qry in dbContext.Quarries
                        where qry.DeletedInd == false
                            && qry.CompanyId == profile.CompanyId
                        orderby qry.QuarryName ascending
                        select new QuarryModel
                        {
                            QuarryId = qry.QuarryId,
                            QuarryName = qry.QuarryName,
                            Location = qry.Location

                        }).ToListAsync();

            var quarryColours = await (from clr in dbContext.QuarryMaterialColours
                                        join mc in dbContext.MaterialColours on clr.MaterialColourId equals mc.MaterialColourId
                                       where clr.DeletedInd == false
                                           && clr.CompanyId == profile.CompanyId
                                       select new { clr.QuarryId, clr.MaterialColourId, mc.ColourName }).ToListAsync();


            quarry.ForEach(q => {
                q.ColourIds = quarryColours.Where(qc => qc.QuarryId == q.QuarryId).Select(qc => qc.MaterialColourId).ToList();
                q.Colours = String.Join(", ", quarryColours.Where(qc => qc.QuarryId == q.QuarryId).Select(qc => qc.ColourName).OrderBy(nm => nm));
            });

            return quarry;
        }

        public async Task QuarryAdd(QuarryModel model)
        {
            QuarryEntity entity = new QuarryEntity()
            {
                QuarryName = model.QuarryName,
                Location = model.Location
            };
            dbContext.Quarries.Add(entity);

            //adding colours ids
            model.ColourIds.ForEach(cId => dbContext.QuarryMaterialColours.Add(new QuarryMaterialColourEntity() { Quarry = entity, MaterialColourId = cId }));

            //adding Yard
            dbContext.Yards.Add(new YardEntity() { YardName = model.QuarryName + " Yard", Location = model.Location, Quarry = entity });

            await dbContext.SaveChangesAsync();

        }

        public async Task QuarryUpdate(QuarryModel model)
        {
            QuarryEntity entity = (from qry in dbContext.Quarries where qry.QuarryId == model.QuarryId && qry.CompanyId == profile.CompanyId select qry).First();
            entity.QuarryName = model.QuarryName;
            entity.Location = model.Location;
            entity.UpdateAuditFields();
            dbContext.Quarries.Update(entity);

            //getting the existing colours
            List<QuarryMaterialColourEntity> colours = (from clr in dbContext.QuarryMaterialColours where clr.QuarryId == model.QuarryId select clr).ToList();

            //deleting colour ids
            colours.Where(c => !model.ColourIds.Contains(c.MaterialColourId)).ToList().ForEach(ce => dbContext.QuarryMaterialColours.Remove(ce));

            //adding colours ids
            model.ColourIds.Except(colours.Select(ce => ce.MaterialColourId)).ToList().ForEach(cId => dbContext.QuarryMaterialColours.Add(new QuarryMaterialColourEntity() { QuarryId = model.QuarryId, MaterialColourId = cId }));

            //updating Yard
            YardEntity yard = (from yd in dbContext.Yards where yd.QuarryId == model.QuarryId select yd).First();
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
        #endregion

        #region Yard
        public async Task<List<YardModel>> YardsGet()
        {
            var query = from yd in dbContext.Yards
                        where yd.DeletedInd == false
                            && yd.CompanyId == profile.CompanyId
                        orderby yd.YardName ascending
                        select new YardModel
                        {
                            YardId = yd.YardId,
                            YardName = yd.YardName,
                            Location = yd.Location,
                            QuarryId = yd.QuarryId
                        };

            return await query.ToListAsync();
        }

        public async Task YardAdd(YardModel model)
        {
            YardEntity entity = new YardEntity()
            {
                YardName = model.YardName,
                Location = model.Location
            };
            dbContext.Yards.Add(entity);
            await dbContext.SaveChangesAsync();

        }

        public async Task YardUpdate(YardModel model)
        {
            YardEntity entity = (from yd in dbContext.Yards where yd.YardId == model.YardId && yd.CompanyId == profile.CompanyId select yd).First();
            entity.YardName = model.YardName;
            entity.Location = model.Location;
            entity.UpdateAuditFields();
            dbContext.Yards.Update(entity);
            await dbContext.SaveChangesAsync();

        }

        public async Task YardSave(YardModel model)
        {
            if (model.YardId == 0)
            {
                await YardAdd(model);
            }
            else
            {
                await YardUpdate(model);
            }
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
                yardId = yards.Where(y => y.QuarryId == model.QuarryId).Select(y => y.YardId).First();

                MaterialEntity material = new MaterialEntity()
                {
                    ProductTypeId = model.ProductTypeId,
                    QuarryId = model.QuarryId,
                    Dimensions = model.Dimensions,
                    MaterialColourId = model.MaterialColourId,
                    MaterialDate = model.MaterialDate
                };

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

        public async Task<MaterialViewModel> MaterialViewModelGet()
        {
            MaterialViewModel viewModel = new MaterialViewModel();

            viewModel.MaterialColour = await (from clr in dbContext.MaterialColours
                                    where clr.DeletedInd == false && clr.CompanyId == profile.CompanyId
                                    orderby clr.ColourName
                                    select new ListItem<int, string>()
                                    {
                                        Key = clr.MaterialColourId,
                                        Item = clr.ColourName
                                    }).ToListAsync();

            viewModel.ProductType = await (from pt in dbContext.ProductTypes
                                       where pt.DeletedInd == false && pt.CompanyId == profile.CompanyId
                                          orderby pt.ProductTypeName
                                          select new ListItem<int, string>()
                                          {
                                              Key = pt.ProductTypeId,
                                              Item = pt.ProductTypeName
                                          }).ToListAsync();

            viewModel.Quarry = await (from qry in dbContext.Quarries
                                       where qry.DeletedInd == false && qry.CompanyId == profile.CompanyId
                                       orderby qry.QuarryName
                                       select new ListItem<int, string>()
                                       {
                                           Key = qry.QuarryId,
                                           Item = qry.QuarryName
                                       }).ToListAsync();

            viewModel.Model = new MaterialModel();

            return viewModel;
        }

        #endregion

        #region Stock & Move Material
        //Material Movement
        public async Task<List<StockModel>> StockGet(int yardId)
        {
            var query = from mm in dbContext.MaterialMovements
                        join mt in dbContext.Materials on mm.MaterialId equals mt.MaterialId
                        join qry in dbContext.Quarries on mt.QuarryId equals qry.QuarryId
                        join pt in dbContext.ProductTypes on mt.ProductTypeId equals pt.ProductTypeId
                        join mc in dbContext.MaterialColours on mt.MaterialColourId equals mc.MaterialColourId
                        where mm.CurrentInd == true
                         && mm.CompanyId == profile.CompanyId
                         && mt.DeletedInd == false
                         && mm.ToYardId == yardId
                        select new StockModel()
                        {
                            MaterialMovementId = mm.MaterialMovementId,
                            Quarry = qry.QuarryName,
                            ProductType = pt.ProductTypeName,
                            MaterialColour = mc.ColourName,
                            Dimensions = mt.Dimensions,
                            MaterialDate = mt.MaterialDate,
                            QuarryId = mt.QuarryId,
                            ProductTypeId = mt.ProductTypeId,
                            MaterialColourId = mt.MaterialColourId
                        };


            return await query.ToListAsync();
        }

        public async Task MoveMaterial(MaterialMovementModel model)
        {
            //inserting the movement
            string sql = "INSERT INTO MaterialMovement(MaterialId, FromYardId, ToYardId, MovementDate, CurrentInd, CreatedUserId, CreatedDate, LastModifiedUserId, LastModifiedDate, DeletedInd, CompanyId) " +
                            " SELECT MaterialId, ToYardId, @ToYardId, @MovementDate, 1, @UserId, @CurrentDate, @UserId, @CurrentDate, 0, @CompanyId FROM MaterialMovement WHERE MaterialMovementId in (" + String.Join(",", model.MaterialMovementIds) + ")";


            await dbContext.Database.AsSqlServer().ExecuteSqlCommand(sql, false, model.ToYardId, model.MovementDate, profile.UserName, DateTime.UtcNow, profile.CompanyId);
        }

        #endregion

    }
}
