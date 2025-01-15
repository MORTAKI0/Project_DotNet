using System.ComponentModel.DataAnnotations;

namespace MyProject_Backend.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Reference { get; set; } = string.Empty;

        public int CurrentQuantity { get; set; }

        public int MinThreshold { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Price { get; set; }

        public bool IsActive { get; set; }

        // Relationships
        public Stock? Stock { get; set; }
        public ICollection<StockMovement>? StockMovements { get; set; }
        public int? SupplierId { get; set; }
        public Supplier? Supplier { get; set; }

        // Ensure consistency between CurrentQuantity and Stock
        public bool IsStockValid()
        {
            return Stock == null || Stock.Quantity == CurrentQuantity;
        }
    }
}
