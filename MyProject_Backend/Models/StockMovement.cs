using System.ComponentModel.DataAnnotations;

namespace MyProject_Backend.Models
{
    public class StockMovement
    {
        [Key]
        public int StockMovementId { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;

        public int? SupplierId { get; set; }
        public Supplier? Supplier { get; set; }

        public int? ClientId { get; set; }
        public Client? Client { get; set; }

        public DateTime MovementDate { get; set; }

        [Range(0, double.MaxValue)]
        public decimal UnitPrice { get; set; }

        public int Quantity { get; set; }
    }
}
