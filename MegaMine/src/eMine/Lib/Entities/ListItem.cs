using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eMine.Lib.Entities
{
    public class ListItem<K, T>
    {
        public K Key { get; set; }
        public T Item { get; set; }
    }

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
