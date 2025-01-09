using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MyProject_Backend.Models;
    
    public class Product
{
    public Product()
    {
        Name = string.Empty;
        Reference = string.Empty;
        Status = string.Empty;
        Category = new Category(); // Initialize Category
        Supplier = new Supplier(); // Initialize Supplier
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required(ErrorMessage = "Name is required.")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Reference is required.")]
    public string Reference { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "Current Quantity must be a positive number.")]
    public int CurrentQuantity { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "Minimum Threshold must be a positive number.")]
    public int MinThreshold { get; set; }

    [Required(ErrorMessage = "Price is required.")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero.")]
    public float Price { get; set; }

    [Required(ErrorMessage = "Status is required.")]
    public string Status { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public bool IsDeleted { get; set; } = false;

     public virtual Stock Stock { get; set; } // Add this property

    public int? CategoryId { get; set; }
    public int? SupplierId { get; set; }

    [ForeignKey("CategoryId")]
    public virtual Category Category { get; set; }

    [ForeignKey("SupplierId")]
    public virtual Supplier Supplier { get; set; }

    public virtual ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
}
