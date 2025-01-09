using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProject_Backend.Models
{
    public class Stock
{
    public Stock()
    {
        Product = new Product(); // Initialize Product
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [ForeignKey("Product")]
    public int ProductId { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "Current Quantity must be a positive number.")]
    public int CurrentQuantity { get; set; }

    public bool IsCritical { get; set; }

    [Range(0, double.MaxValue, ErrorMessage = "Value must be a positive number.")]
    public float Value { get; set; }

    public DateTime LastUpdated { get; set; } = DateTime.Now;

    public virtual Product Product { get; set; }
}
}