using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyProject_Backend.Models;

namespace MyProject_Backend.Data
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Define DbSet properties for your entities
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<StockMovement> StockMovements { get; set; }
        public DbSet<Client> Clients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure one-to-one relationship between Product and Stock
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Stock)
                .WithOne(s => s.Product)
                .HasForeignKey<Stock>(s => s.ProductId);

            // Configure other relationships
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Supplier)
                .WithMany(s => s.Products)
                .HasForeignKey(p => p.SupplierId);

            modelBuilder.Entity<StockMovement>()
                .HasOne(sm => sm.Product)
                .WithMany(p => p.StockMovements)
                .HasForeignKey(sm => sm.ProductId);

            modelBuilder.Entity<StockMovement>()
                .HasOne(sm => sm.User)
                .WithMany(u => u.StockMovements)
                .HasForeignKey(sm => sm.UserId);

            modelBuilder.Entity<StockMovement>()
                .HasOne(sm => sm.Client)
                .WithMany(c => c.StockMovements)
                .HasForeignKey(sm => sm.ClientId);
        }
    }
}