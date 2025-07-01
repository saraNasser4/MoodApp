using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<MoodContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddCors(options =>
{
    Console.WriteLine(options);
    options.AddPolicy("reactFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Middleware
app.UseCors("ReactFrontend");
app.UseAuthorization();
app.MapControllers();

// Apply migrations (in development)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MoodContext>();
    db.Database.Migrate();
}

var port = Environment.GetEnvironmentVariable("ASPNETCORE_PORT") ?? "5065";
app.Run($"http://localhost:{port}");



