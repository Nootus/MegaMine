using Microsoft.Data.Entity.Relational;
using Microsoft.Data.Entity.SqlServer;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Extensions
{
    public static class EntityExtensions
    {
        //public static async Task<int> ExecuteSqlCommand(this SqlServerDatabase database, string sql, RelationalTransaction transaction, bool throwexception = false, params KeyValuePair<string, object>[] parameters)
        //{
        //    if (throwexception)
        //        throw new Exception("bad");

        //    var connection = database.Connection;
            
        //    var command = connection.DbConnection.CreateCommand();
        //    command.CommandText = sql;
        //    command.Transaction = transaction.DbTransaction;
            
        //    foreach(var parameter in parameters)
        //    {
        //        command.Parameters.Add(new SqlParameter(parameter.Key, parameter.Value));
        //    }

        //    try
        //    {
        //        connection.Open();

        //        return await command.ExecuteNonQueryAsync();
        //    }
        //    finally
        //    {
        //        connection.Close();
        //    }
        //}
    }
}
