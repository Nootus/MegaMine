namespace MegaMine.Modules.Quarry.Models
{
    public class StockModel : MaterialModel
    {
        public int MaterialMovementId { get; set; }
        public string ProductType { get; set; }
        public string MaterialColour { get; set; }
        public string Texture { get; set; }
        public string Quarry { get; set; }
    }
}
