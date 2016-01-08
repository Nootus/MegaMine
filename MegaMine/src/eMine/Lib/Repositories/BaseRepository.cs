using AutoMapper;
using eMine.Lib.Shared;
using eMine.Models.Account;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Repositories
{
    public class BaseRepository
    {
        protected ApplicationDbContext dbContext;
        protected ProfileModel profile;

        public BaseRepository()
        {
            profile = Shared.Profile.Current;
        }

        protected async Task<TEntity> SaveEntity<TEntity, TModel>(TModel model, bool commit = true) where TEntity : class
        {
            //checking for add or update
            IEntityType entityType = dbContext.Model.FindEntityType(typeof(TEntity));

            IKey key = entityType.FindPrimaryKey();
            int primaryKey = (int)typeof(TModel).GetProperty(key.Properties.First().Name).GetValue(model);

            if (primaryKey == 0)
            {
                return await AddEntity<TEntity, TModel>(model, commit);
            }
            else
            {
                return await UpdateEntity<TEntity, TModel>(model, commit);
            }
        }

        protected async Task<TEntity> AddEntity<TEntity, TModel>(TModel model, bool commit = true) where TEntity : class
        {
            TEntity entity = Mapper.Map<TModel, TEntity>(model);
            dbContext.Add<TEntity>(entity);

            if(commit)
                await dbContext.SaveChangesAsync();

            return entity;
        }

        protected async Task<TEntity> UpdateEntity<TEntity, TModel>(TModel model, bool commit = true) where TEntity : class
        {
            TEntity entity = Mapper.Map<TModel, TEntity>(model);
            dbContext.Update<TEntity>(entity);

            if(commit)
                await dbContext.SaveChangesAsync();

            return entity;
        }


    }
}
