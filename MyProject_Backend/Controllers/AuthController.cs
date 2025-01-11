using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyProject_Backend.Models;
using System.Threading.Tasks;
using System.Linq;
using MyProject_Backend.Data;

namespace MyProject_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

       public class LoginModel
{
    public string Username { get; set; }
    public string Password { get; set; }
}

        public class LoginResponse
        {
            public bool Succeeded { get; set; }
            public string Message { get; set; }
            public string Role { get; set; }
        }

        public AuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
public async Task<IActionResult> Login([FromBody] LoginModel model)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(new LoginResponse 
        { 
            Succeeded = false, 
            Message = "Invalid model state: " + string.Join("; ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage))
        });
    }

    // Check if user exists
    var user = await _userManager.FindByNameAsync(model.Username);
    if (user == null)
    {
        return Unauthorized(new LoginResponse 
        { 
            Succeeded = false, 
            Message = "User not found" 
        });
    }

    var result = await _signInManager.PasswordSignInAsync(
        model.Username,
        model.Password,
        isPersistent: false,
        lockoutOnFailure: false);

    if (result.Succeeded)
    {
        var roles = await _userManager.GetRolesAsync(user);
        return Ok(new LoginResponse
        {
            Succeeded = true,
            Message = "Login successful",
            Role = roles.FirstOrDefault()
        });
    }

    return Unauthorized(new LoginResponse 
    { 
        Succeeded = false, 
        Message = $"Login failed: {(result.IsLockedOut ? "Account locked" : result.IsNotAllowed ? "Login not allowed" : "Invalid credentials")}" 
    });
}

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { message = "Logged out successfully" });
        }
    }
}