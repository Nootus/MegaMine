//-------------------------------------------------------------------------------------------------
// <copyright file="ApplicationUser.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  IdentityUser class to store the logged in user detaills
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Services.Security.Entities
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

    public class ApplicationUser : IdentityUser
    {
    }
}
