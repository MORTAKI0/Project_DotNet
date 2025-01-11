using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MyProject_Backend.Data;
using MyProject_Backend.Models;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder
                .WithOrigins("http://localhost:3000") // Your React app URL
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});

// Configure the database and Identity
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Identity services
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.SignIn.RequireConfirmedAccount = false; // Disable email confirmation
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Configure cookie-based authentication
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Account/Login";
    options.AccessDeniedPath = "/Account/AccessDenied";
    options.ExpireTimeSpan = TimeSpan.FromMinutes(30); // Adjust the timeout
});

// Build the application
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors("AllowReactApp"); // Enable CORS

app.UseAuthentication(); // Enable authentication
app.UseAuthorization(); // Enable authorization

app.MapControllers();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Seed roles and admin user on application startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        await SeedRolesAndAdminUser(roleManager, userManager); // Call the function
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding roles and admin user.");
    }
}

app.Run();

// Function to seed roles and admin user
async Task SeedRolesAndAdminUser(RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager)
{
    // Seed roles
    string[] roleNames = { "Admin", "User" };
    foreach (var roleName in roleNames)
    {
        if (!await roleManager.RoleExistsAsync(roleName))
        {
            await roleManager.CreateAsync(new IdentityRole(roleName));
            Console.WriteLine($"Created role: {roleName}");
        }
    }

    // Seed admin user
    var adminUser = new ApplicationUser
    {
        UserName = "admin@example.com",
        Email = "admin@example.com",
        Role = "Admin",
        Status = "Active"
    };

    const string adminPassword = "Admin@123";
    var user = await userManager.FindByNameAsync(adminUser.UserName);
    if (user == null)
    {
        var createUserResult = await userManager.CreateAsync(adminUser, adminPassword);
        if (createUserResult.Succeeded)
        {
            var addToRoleResult = await userManager.AddToRoleAsync(adminUser, "Admin");
            Console.WriteLine($"Admin user created: {createUserResult.Succeeded}");
            Console.WriteLine($"Admin role assigned: {addToRoleResult.Succeeded}");
        }
        else
        {
            Console.WriteLine("Failed to create admin user:");
            foreach (var error in createUserResult.Errors)
            {
                Console.WriteLine($"- {error.Description}");
            }
        }
    }
}
