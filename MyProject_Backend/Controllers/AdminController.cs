using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class AdminController : ControllerBase
{
    [HttpGet("dashboard")]
    [Authorize(Roles = "Admin")]
    public IActionResult AdminDashboard()
    {
        return Ok(new { message = "Welcome to the Admin Dashboard!" });
    }
}