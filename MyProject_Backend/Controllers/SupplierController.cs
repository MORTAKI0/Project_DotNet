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

  public SupplierController(ApplicationDbContext dbContext)
  {
    _context = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Supplier>>> GetSuppliers()
  {
    try
    {
      var suppliers = await _context.Suppliers.ToListAsync();
      return Ok(suppliers ?? new List<Supplier>());
    }
    catch (Exception ex)
    {
      return StatusCode(500, $"Internal server error: {ex.Message}");
    }
  }

  [HttpPost]
public async Task<IActionResult> CreateSupplier(Supplier supplier)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    try
    {
        // Check if supplier name already exists to avoid duplicates (if necessary)
        bool exists = await _context.Suppliers.AnyAsync(s => s.Name == supplier.Name);
        if (exists)
        {
            return BadRequest("Supplier with the same name already exists.");
        }

        _context.Suppliers.Add(supplier);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSuppliers), new { id = supplier.SupplierId }, supplier);
    }
    catch (DbUpdateException dbEx)
    {
        return StatusCode(500, $"Database error: {dbEx.Message}");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

}