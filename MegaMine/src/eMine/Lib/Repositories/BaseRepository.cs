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

        protected async Task<List<TModel>> GetList<TEntity, TModel>(Expression<Func<TEntity, string>> sortExpression) where TEntity : BaseEntity
        {
            var query = dbContext.Set<TEntity>().Where(ent => ent.DeletedInd == false && ent.CompanyId == profile.CompanyId)
                                .OrderBy(sortExpression)
                                .Select(ent => Mapper.Map<TEntity, TModel>(ent));

            return await query.ToListAsync();
        }


        protected async Task<List<ListItem<int, string>>> GetListItems<TEntity>(Expression<Func<TEntity, ListItem<int, string>>> selectExpression, Expression<Func<TEntity, string>> sortExpression) where TEntity : BaseEntity
        {
            var query = dbContext.Set<TEntity>().Where(ent => ent.DeletedInd == false && ent.CompanyId == profile.CompanyId)
                        .OrderBy(sortExpression)
                        .Select(selectExpression);

            return await query.ToListAsync();

        }

        protected void GetSingle<TEntity>(int id) where TEntity : BaseEntity
        {
            var entityParam = Expression.Parameter(typeof(IQueryable<TEntity>), "entity");
            var aliasParam = Expression.Parameter(typeof(TEntity), "e");


            Expression query = entityParam;


            var whereClause = Expression.Lambda(
                Expression.MakeBinary(
                    ExpressionType.Equal,
                    Expression.PropertyOrField(aliasParam, "QuarryId"),
                    Expression.Constant(id)
                ),
                aliasParam
            );


            //var columnLambda = Expression.Lambda(Expression.Property(aliasParam, "QuarryId"), aliasParam);

            //query = Expression.Call(typeof(Queryable), "Where", new[] { typeof(TEntity) }, query, whereClause);
            ////query = Expression.Call(typeof(Queryable), "Count", new[] { typeof(TEntity) }, query);
            //query = Expression.Call(typeof(Queryable), "Select", new[] { typeof(TEntity), columnLambda.Body.Type }, query, columnLambda);
            //Expression.Lambda(query, entityParam).Compile().DynamicInvoke(dbContext.Set<TEntity>());

            //var query = dbContext.Set<TEntity>().Where(whereClause)
        }

    }
}
