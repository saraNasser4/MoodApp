var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


app.MapGet("/", () => "Hello");

var port = Environment.GetEnvironmentVariable("ASPNETCORE_PORT") ?? "5065";
app.Run($"http://localhost:{port}");

