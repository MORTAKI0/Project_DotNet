using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProject_Backend.Models
{
    public class Category
{
    public Category()
    {
        Name = string.Empty;
        Description = string.Empty;
    }

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required(ErrorMessage = "Name is required.")]
    public string Name { get; set; }

    public string Description { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
}