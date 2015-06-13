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
}
