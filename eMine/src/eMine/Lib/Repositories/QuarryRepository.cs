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
    }
}
