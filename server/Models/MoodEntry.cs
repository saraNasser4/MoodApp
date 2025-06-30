namespace MoodApp.Server.Models;

public class MoodEntry
{
    public int Id { get; set; }
    public string Mood { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
