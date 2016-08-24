//-------------------------------------------------------------------------------------------------
// <copyright file="LoginModel.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  DTO for login details
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Security.Models
{
    public class LoginModel
    {
        public string UserName { get; set; }

        public string UserPassword { get; set; }
    }
}