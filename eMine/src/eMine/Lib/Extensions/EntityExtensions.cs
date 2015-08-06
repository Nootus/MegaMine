using Microsoft.Data.Entity.Relational;
using Microsoft.Data.Entity.SqlServer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Extensions
{
    public static class EntityExtensions
    {
        public static async Task<int> ExecuteSqlCommand(this SqlServerDatabase database, string sql, bool throwexception = false, params object[] parameters)
        {
            if (throwexception)
                throw new Exception("bad");

            var connection = database.Connection;
            
            var command = connection.DbConnection.CreateCommand();
            command.CommandText = sql;
            
            foreach(var parameter in parameters)
            {
                command.Parameters.Add(parameter);
            }

            try
            {
                connection.Open();

                return await command.ExecuteNonQueryAsync();
            }
            finally
            {
                connection.Close();
            }
        }
    }
}
