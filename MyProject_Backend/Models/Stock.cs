using System.ComponentModel.DataAnnotations;

namespace MyProject_Backend.Models
{
    public class Stock
    {
        [Key]
        public int StockId { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;

        public int Quantity { get; set; }
    }
}
