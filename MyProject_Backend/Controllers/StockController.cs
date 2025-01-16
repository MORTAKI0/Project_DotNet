using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyProject_Backend.Data;
using MyProject_Backend.Models;

namespace MyProject_Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class StockController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StockController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPut("{productId}/update")]
    public async Task<IActionResult> UpdateStock(int productId, int quantity)
    {
        var product = await _context.Products.Include(p => p.Stock).FirstOrDefaultAsync(p => p.ProductId == productId);

        if (product == null)
        {
            return NotFound("Product not found.");
        }

        if (product.Stock == null)
        {
            return NotFound("Stock not found.");
        }

        product.Stock.Quantity = quantity;
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
