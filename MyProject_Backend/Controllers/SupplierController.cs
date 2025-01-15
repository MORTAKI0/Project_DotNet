using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyProject_Backend.Data;
using MyProject_Backend.Models;

namespace MyProject_Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SupplierController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SupplierController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Supplier>>> GetSuppliers()
    {
        try
        {
            return await _context.Suppliers.ToListAsync();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

   [HttpPost]
public async Task<IActionResult> CreateSupplier(Supplier supplier)
{
    if (!ModelState.IsValid) return BadRequest(ModelState);

    if (await _context.Suppliers.AnyAsync(s => s.Name == supplier.Name))
    {
        return BadRequest("Supplier name must be unique.");
    }

    try
    {
        _context.Suppliers.Add(supplier);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSuppliers), new { id = supplier.SupplierId }, supplier);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

}
