using System.ComponentModel.DataAnnotations;

namespace MegaMine.Core.Widgets
{
    public class ChartEntity<Tx, Ty>
    {
        [Key]
        public string Id { get; set; }
        public string Key { get; set; }
        public Tx X { get; set; }
        public Ty Y { get; set; }
    }
}
