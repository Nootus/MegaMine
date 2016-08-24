//-------------------------------------------------------------------------------------------------
// <copyright file="BaseRepository.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Base Repository with CRUD operations
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Core.Repositories
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Data.SqlClient;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading.Tasks;
    using AutoMapper;
    using MegaMine.Core.Context;
    using MegaMine.Core.Entities;
    using MegaMine.Core.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata;

    public class BaseRepository<TContext>
        where TContext : DbContext
    {
        private TContext dbContext;
        private NTContextModel context;

        public BaseRepository()
        {
            this.context = NTContext.Context;
        }

        public TContext DbContext
        {
            get
            {
                return this.dbContext;
            }

            protected set
            {
                this.dbContext = value;
            }
        }

        public NTContextModel AppContext
        {
            get { return this.context; }
        }

        protected async Task<TEntity> SaveEntity<TEntity, TModel>(TModel model, bool commit = true)
            where TEntity : BaseEntity
        {
            // checking for add or update
            string keyName = this.GetKeyName<TEntity>();
            int primaryKey = (int)typeof(TModel).GetProperty(keyName).GetValue(model);

            if (primaryKey == 0)
            {
                return await this.AddEntity<TEntity, TModel>(model, commit);
            }
            else
            {
                return await this.UpdateEntity<TEntity, TModel>(model, commit);
            }
        }

        protected async Task<TEntity> AddEntity<TEntity, TModel>(TModel model, bool commit = true)
            where TEntity : BaseEntity
        {
            TEntity entity = Mapper.Map<TModel, TEntity>(model);
            this.dbContext.Add<TEntity>(entity);

            if (commit)
            {
                await this.dbContext.SaveChangesAsync();
            }

            return entity;
        }

        protected async Task<TEntity> UpdateEntity<TEntity, TModel>(TModel model, bool commit = true)
            where TEntity : BaseEntity
        {
            TEntity entity = Mapper.Map<TModel, TEntity>(model);

            return await this.UpdateEntity<TEntity>(entity, false, commit);
        }

        protected async Task<TEntity> UpdateEntity<TEntity>(TEntity entity, bool updateAuditFields, bool commit)
            where TEntity : BaseEntity
        {
            this.dbContext.Update<TEntity>(entity);

            if (updateAuditFields)
            {
                entity.UpdateAuditFields();
            }

            if (commit)
            {
                await this.dbContext.SaveChangesAsync();
            }

            return entity;
        }

        protected async Task DeleteEntity<TEntity>(int entityId, bool commit = true)
            where TEntity : BaseEntity
        {
            var entity = await this.GetSingleAsync<TEntity>(entityId);
            await this.DeleteEntity(entity, commit);
        }

        protected async Task DeleteEntity<TEntity>(Expression<Func<TEntity, bool>> whereExpression, bool commit = true)
            where TEntity : BaseEntity
        {
            var entity = await this.dbContext.Set<TEntity>().Where(whereExpression).Select(ent => ent).SingleAsync();
            await this.DeleteEntity(entity, commit);
        }

        protected async Task DeleteEntity<TEntity>(TEntity entity, bool commit = true)
            where TEntity : BaseEntity
        {
            entity.DeletedInd = true;
            entity.UpdateAuditFields();
            this.dbContext.Set<TEntity>().Update(entity);

            if (commit)
            {
                await this.dbContext.SaveChangesAsync();
            }
        }

        protected async Task<List<TModel>> GetListAsync<TEntity, TModel>(Expression<Func<TEntity, string>> sortExpression)
            where TEntity : BaseEntity
        {
            var query = this.dbContext.Set<TEntity>().Where(e => e.DeletedInd == false && e.CompanyId == this.context.CompanyId)
                                .OrderBy(sortExpression)
                                .Select(ent => Mapper.Map<TEntity, TModel>(ent));

            return await query.ToListAsync();
        }

        protected async Task<List<TModel>> GetListAsync<TEntity, TModel>(Expression<Func<TEntity, bool>> whereExpression, bool noAdditionalCheck, Expression<Func<TEntity, string>> sortExpression)
            where TEntity : BaseEntity
        {
            if (!noAdditionalCheck)
            {
                return await this.GetListAsync<TEntity, TModel>(whereExpression, sortExpression);
            }
            else
            {
                var query = this.dbContext.Set<TEntity>().Where(whereExpression)
                                    .OrderBy(sortExpression)
                                    .Select(ent => Mapper.Map<TEntity, TModel>(ent));

                return await query.ToListAsync();
            }
        }

        protected async Task<List<TModel>> GetListAsync<TEntity, TModel>(Expression<Func<TEntity, bool>> whereExpression, Expression<Func<TEntity, string>> sortExpression)
            where TEntity : BaseEntity
        {
            return await this.GetListAsync<TEntity, TModel, string>(whereExpression, sortExpression);
        }

        protected async Task<List<TModel>> GetListAsync<TEntity, TModel, TSort>(Expression<Func<TEntity, bool>> whereExpression, Expression<Func<TEntity, TSort>> sortExpression)
            where TEntity : BaseEntity
        {
            var query = this.dbContext.Set<TEntity>().Where(whereExpression).Where(e => e.DeletedInd == false && e.CompanyId == this.context.CompanyId)
                                .OrderBy(sortExpression)
                                .Select(ent => Mapper.Map<TEntity, TModel>(ent));

            return await query.ToListAsync();
        }

        protected async Task<List<ListItem<int, string>>> GetListItemsAsync<TEntity>(Expression<Func<TEntity, ListItem<int, string>>> selectExpression, Expression<Func<TEntity, string>> sortExpression)
            where TEntity : BaseEntity
        {
            var query = this.dbContext.Set<TEntity>().Where(e => e.DeletedInd == false && e.CompanyId == this.context.CompanyId)
                        .OrderBy(sortExpression)
                        .Select(selectExpression);

            return await query.ToListAsync();
        }

        protected async Task<TEntity> GetSingleAsync<TEntity>(Expression<Func<TEntity, bool>> whereExpression)
            where TEntity : class
        {
            return await this.dbContext.Set<TEntity>().Where(whereExpression).Select(ent => ent).SingleAsync();
        }

        protected async Task<TEntity> GetSingleAsync<TEntity>(object id)
                                                                            where TEntity : BaseEntity
        {
            var entity = this.dbContext.Set<TEntity>().AsQueryable();

            // building where clause
            string keyName = this.GetKeyName<TEntity>();
            var aliasParam = Expression.Parameter(typeof(TEntity), "e");
            var whereExpression = Expression.Lambda(
            Expression.MakeBinary(
                    ExpressionType.Equal,
                    Expression.PropertyOrField(aliasParam, keyName),
                    Expression.Constant(id)),
                aliasParam);

            var whereQuery = (IQueryable<TEntity>)entity.Provider.CreateQuery(
                Expression.Call(
                    typeof(Queryable),
                    "Where",
                    new Type[] { entity.ElementType },
                    entity.Expression,
                    Expression.Quote(whereExpression)));

            var query = whereQuery.Select(e => e);

            return await query.SingleAsync();
        }

        protected SqlParameter CreateParameter(SqlCommand command, string parameterName, DbType type, object value)
        {
            SqlParameter parameter = command.CreateParameter();
            parameter.ParameterName = parameterName;
            parameter.DbType = type;
            parameter.Value = value == null ? DBNull.Value : value;
            return parameter;
        }

        private string GetKeyName<TEntity>()
        {
            IEntityType entityType = this.dbContext.Model.FindEntityType(typeof(TEntity));

            IKey key = entityType.FindPrimaryKey();

            return key.Properties.First().Name;
        }
    }
}
