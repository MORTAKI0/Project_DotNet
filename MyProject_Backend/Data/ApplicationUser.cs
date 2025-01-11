using Microsoft.AspNetCore.Identity;

namespace MyProject_Backend.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; } = string.Empty; // Initialize with default value
        public string LastName { get; set; } = string.Empty; // Initialize with default value
        public string Role { get; set; } = string.Empty; // Initialize with default value
        public string Status { get; set; } = string.Empty; // Initialize with default value
    }
}