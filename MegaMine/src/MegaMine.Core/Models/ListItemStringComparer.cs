//-------------------------------------------------------------------------------------------------
// <copyright file="ChartEntity.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  String comparer of the generic Key Value pair
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Core.Models
{
    using System.Collections.Generic;

    public class ListItemStringComparer : IEqualityComparer<ListItem<string, string>>
    {
        public bool Equals(ListItem<string, string> x, ListItem<string, string> y)
        {
            return x.Key == y.Key && x.Item == y.Item;
        }

        public int GetHashCode(ListItem<string, string> obj)
        {
            return new { obj.Key, obj.Item }.GetHashCode();
        }
    }
}