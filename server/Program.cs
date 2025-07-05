using Microsoft.EntityFrameworkCore;
using MoodApp.Server.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<MoodContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJS", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<MoodContext>();
        db.Database.Migrate();
    }
}

// Middleware
app.UseRouting();
app.UseCors("AllowNextJS");
app.UseAuthorization();
app.MapControllers();

app.MapPost("/api/mood", async(MoodEntry mood, MoodContext db) =>
{
    try
    {
        if (mood == null) Results.BadRequest("Mood entry data is required");

        db.MoodEntries.Add(mood);
        await db.SaveChangesAsync();
        return Results.Created($"api/mood/{mood.Id}", mood);

    }
    catch (DbUpdateException ex)
    {
        Console.WriteLine($"Database error: {ex.InnerException?.Message ?? ex.Message}");
        return Results.Problem(
            title: "Database error",
            detail: ex.InnerException?.Message ?? ex.Message,
            statusCode: StatusCodes.Status500InternalServerError
        );   
    }
});


var port = Environment.GetEnvironmentVariable("ASPNETCORE_PORT") ?? "5065";
app.Run($"http://localhost:{port}");



