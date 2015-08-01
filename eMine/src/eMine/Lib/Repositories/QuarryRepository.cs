using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eMine.Models.Quarry;
using eMine.Lib.Entities.Quarry;

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
            //Update the VehicleService Entity first
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
            //Update the VehicleService Entity first
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
            //Update the VehicleService Entity first
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
    }
}
