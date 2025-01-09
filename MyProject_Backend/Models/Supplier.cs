using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProject_Backend.Models
 {
    public class Supplier
{
    public Supplier()
    {
        Name = string.Empty;
        Contact = string.Empty;
        Email = string.Empty;
        Phone = string.Empty;
        Address = string.Empty;
        Status = string.Empty;
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required(ErrorMessage = "Name is required.")]
    public string Name { get; set; }

    public string Contact { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    public string Status { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime UpdatedAt { get; set; } = DateTime.Now;

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
}