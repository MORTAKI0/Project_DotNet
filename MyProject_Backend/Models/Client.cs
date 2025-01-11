using System.ComponentModel.DataAnnotations;

namespace MyProject_Backend.Models
{
    public class Client
    {
        [Key]
        public int ClientId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        public ICollection<StockMovement>? StockMovements { get; set; }
    }
}
