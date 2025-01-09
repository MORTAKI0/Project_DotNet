  
using Microsoft.AspNetCore.Identity;
using MyProject_Backend.Models;  
  
  
  public class User : IdentityUser
{
    public string Role { get; set; } = "User"; // Default role
    public string Status { get; set; } = "Active"; // Default status
    public DateTime LastLogin { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    // Navigation property
    public virtual ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
}