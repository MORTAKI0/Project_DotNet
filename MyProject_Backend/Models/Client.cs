using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProject_Backend.Models
{
  public class Client
{
    public Client()
    {
        Name = string.Empty;
        FirstName = string.Empty;
        Email = string.Empty;
        Phone = string.Empty;
        Address = string.Empty;
        Company = string.Empty;
        Notes = string.Empty;
        PasswordHash = string.Empty;
        Status = string.Empty;
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required(ErrorMessage = "Name is required.")]
    public string Name { get; set; }

    public string FirstName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    public string Company { get; set; }
    public string Notes { get; set; }

    [Required(ErrorMessage = "Password is required.")]
    public string PasswordHash { get; set; }

    public string Status { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;
    public bool IsDeleted { get; set; } = false;

    public virtual ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
}
}