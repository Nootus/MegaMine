//-------------------------------------------------------------------------------------------------
// <copyright file="ListItem.cs" company="Nootus">
//  Copyright (c) Nootus. All rights reserved.
// </copyright>
// <description>
//  Generic Key Value pair to transfer data to UI
// </description>
//-------------------------------------------------------------------------------------------------
namespace MegaMine.Core.Models
{
    public class ListItem<K, T>
    {
        public K Key { get; set; }

        public T Item { get; set; }
    }
}
