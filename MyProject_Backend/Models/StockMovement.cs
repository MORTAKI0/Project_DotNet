using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProject_Backend.Models
{
    public class StockMovement
{
    public StockMovement()
    {
        Type = string.Empty;
        Reason = string.Empty;
        BatchNumber = string.Empty;
        Product = new Product(); // Initialize Product
        User = new User(); // Initialize User
        Client = new Client(); // Initialize Client
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required(ErrorMessage = "Type is required.")]
    public string Type { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "Quantity must be a positive number.")]
    public int Quantity { get; set; }

    public string Reason { get; set; }

    public DateTime Date { get; set; } = DateTime.Now;

    [Required]
    [ForeignKey("Product")]
    public int ProductId { get; set; }

    [Required]
    [ForeignKey("User")]
    public string UserId { get; set; }

    [ForeignKey("Client")]
    public int? ClientId { get; set; }

    public string BatchNumber { get; set; }

    [Range(0.01, double.MaxValue, ErrorMessage = "Unit Price must be greater than zero.")]
    public float UnitPrice { get; set; }

    public virtual Product Product { get; set; }
    public virtual User User { get; set; }
    public virtual Client Client { get; set; }
}}