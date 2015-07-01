using eMine.Lib.Entities;
using eMine.Lib.Entities.Fleet;
using eMine.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Repositories.Administration
{
    public class AdminRepository : BaseRepository
    {
        //Configuration
        public List<ListItem<int, string>> ConfigurationListItemGet()
        {
            var query = from cg in dbContext.Configurations
                        where cg.DeletedInd == false
                        orderby cg.ConfigurationId ascending
                        select new ListItem<int, string>()
                        {
                            Key = cg.ConfigurationId,
                            Item = cg.ConfigKey
                        };

            return query.ToList();
        }

        public ConfigurationModel ConfigurationGet(int ConfigurationId)
        {

            var query = from cg in dbContext.Configurations
                        where cg.ConfigurationId == ConfigurationId
                        && cg.DeletedInd == false
                        select new ConfigurationModel
                        {
                            ConfigurationId = cg.ConfigurationId,
                            ConfigKey = cg.ConfigKey,
                            ConfigValue = cg.ConfigValue
                        };


            ConfigurationModel model = query.FirstOrDefault();

            return model;
        }

        public void ConfigurationAdd(ConfigurationModel model)
        {
            ConfigurationEntity entity = new ConfigurationEntity()
            {
                ConfigurationId = model.ConfigurationId,
                ConfigKey = model.ConfigKey,
                ConfigValue = model.ConfigValue
            };
            dbContext.Configurations.Add(entity);
            dbContext.SaveChanges();

        }

        public void ConfigurationUpdate(ConfigurationModel model)
        {
            //Update the Configuration Entity first
            ConfigurationEntity entity = (from cg in dbContext.Configurations where cg.ConfigurationId == model.ConfigurationId select cg).First();
            entity.ConfigKey = model.ConfigKey;
            entity.ConfigValue = model.ConfigValue;
            entity.UpdateAuditFields();
            dbContext.Configurations.Update(entity);
            dbContext.SaveChanges();

        }

        public async Task ConfigurationSave(ConfigurationModel model)
        {
            if (model.ConfigurationId == 0)
            {
               ConfigurationAdd(model);
            }
            else
            {
               ConfigurationUpdate(model);
            }
        }
    }
}
