using Microsoft.AspNetCore.Identity;

namespace MyProject.Models // Replace with your actual namespace
{
    public class ApplicationUser : IdentityUser
    {
        // Add custom properties if needed
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}