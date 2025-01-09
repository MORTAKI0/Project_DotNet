using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MyProject_Backend.Data; // Add this using directive
using MyProject_Backend.Models;

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

builder.Services.AddIdentity<User, IdentityRole>(options =>
{
    options.SignIn.RequireConfirmedAccount = false; // Disable email confirmation
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

// Configure cookie-based authentication
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.HttpOnly = true; // Prevent client-side script access to the cookie
        options.ExpireTimeSpan = TimeSpan.FromHours(3); // Cookie expiry time
        options.LoginPath = "/api/auth/login"; // Redirect to login if unauthorized
        options.AccessDeniedPath = "/api/auth/access-denied"; // Redirect if access is denied
        options.SlidingExpiration = true; // Renew the cookie if the user is active
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}
app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("AllowSpecificOrigin"); // Enable CORS

app.UseAuthentication(); // Enable authentication
app.UseAuthorization(); // Enable authorization

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
        var userManager = services.GetRequiredService<UserManager<User>>();
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
async Task SeedRolesAndAdminUser(RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
{
    // Seed roles
    string[] roleNames = { "Admin", "User" }; // Add more roles if needed
    foreach (var roleName in roleNames)
    {
        if (!await roleManager.RoleExistsAsync(roleName))
        {
            await roleManager.CreateAsync(new IdentityRole(roleName));
        }
    }

    // Seed admin user
    var adminUser = new User
    {
        UserName = "admin",
        Email = "admin@example.com",
        Role = "Admin", // Set Role
        Status = "Active" // Set Status
    };

    const string adminPassword = "Admin@123"; // Set a strong password
    var user = await userManager.FindByNameAsync(adminUser.UserName);
    if (user == null)
    {
        var createUserResult = await userManager.CreateAsync(adminUser, adminPassword);
        if (createUserResult.Succeeded)
        {
            await userManager.AddToRoleAsync(adminUser, "Admin");
        }
    }
}