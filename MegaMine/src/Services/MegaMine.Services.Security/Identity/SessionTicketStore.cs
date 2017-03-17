//-------------------------------------------------------------------------------------------------
// <copyright file="SessionTicketStore.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  User messages in this project
// </description>
//-------------------------------------------------------------------------------------------------

namespace MegaMine.Services.Security.Identity
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.AspNetCore.Authentication.Cookies;

    public class SessionTicketStore : ITicketStore
    {
        public Task RemoveAsync(string key)
        {
            throw new NotImplementedException();
        }

        public Task RenewAsync(string key, AuthenticationTicket ticket)
        {
            throw new NotImplementedException();
        }

        public Task<AuthenticationTicket> RetrieveAsync(string key)
        {
            throw new NotImplementedException();
        }

        public Task<string> StoreAsync(AuthenticationTicket ticket)
        {
            throw new NotImplementedException();
        }
    }
}
