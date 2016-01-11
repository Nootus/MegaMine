using AutoMapper;
using eMine.Lib.Entities;
using eMine.Lib.Shared;
using eMine.Models.Account;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Linq.Expressions;

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
            string keyName = GetKeyName<TEntity>();
            int primaryKey = (int)typeof(TModel).GetProperty(keyName).GetValue(model);

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

        protected async Task<List<TModel>> GetListAsync<TEntity, TModel>(Expression<Func<TEntity, string>> sortExpression) where TEntity : BaseEntity
        {
            var query = dbContext.Set<TEntity>().Where(ent => ent.DeletedInd == false && ent.CompanyId == profile.CompanyId)
                                .OrderBy(sortExpression)
                                .Select(ent => Mapper.Map<TEntity, TModel>(ent));

            return await query.ToListAsync();
        }

        protected async Task<List<TModel>> GetListAsync<TEntity, TModel>(Expression<Func<TEntity, bool>> whereExpression) where TEntity : BaseEntity
        {
            var query = dbContext.Set<TEntity>().Where(whereExpression)
                                .Select(ent => Mapper.Map<TEntity, TModel>(ent));

            return await query.ToListAsync();
        }


        protected async Task<List<ListItem<int, string>>> GetListItemsAsync<TEntity>(Expression<Func<TEntity, ListItem<int, string>>> selectExpression, Expression<Func<TEntity, string>> sortExpression) where TEntity : BaseEntity
        {
            var query = dbContext.Set<TEntity>().Where(ent => ent.DeletedInd == false && ent.CompanyId == profile.CompanyId)
                        .OrderBy(sortExpression)
                        .Select(selectExpression);

            return await query.ToListAsync();

        }

        protected async Task<TEntity> GetSingleAsync<TEntity>(int id) where TEntity : BaseEntity
        {
            var entity = dbContext.Set<TEntity>().AsQueryable();

            //building where clause
            string keyName = GetKeyName<TEntity>();
            var aliasParam = Expression.Parameter(typeof(TEntity), "e");
            var whereExpression = Expression.Lambda(
            Expression.MakeBinary(
                    ExpressionType.Equal,
                    Expression.PropertyOrField(aliasParam, keyName),
                    Expression.Constant(id)
                ),
                aliasParam
            );

            var whereQuery = (IQueryable<TEntity>) entity.Provider.CreateQuery(
                Expression.Call(
                    typeof(Queryable), "Where",
                    new Type[] { entity.ElementType },
                    entity.Expression, Expression.Quote(whereExpression)));

            var query = whereQuery.Select(e => e);

            return await query.SingleAsync(); ;
        }

        private string GetKeyName<TEntity>()
        {
            IEntityType entityType = dbContext.Model.FindEntityType(typeof(TEntity));
 
            IKey key = entityType.FindPrimaryKey();

            return key.Properties.First().Name;
        }

    }
}
