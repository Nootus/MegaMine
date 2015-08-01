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

        #region MaterialColourType
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
    }
}
