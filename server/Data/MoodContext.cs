using Microsoft.EntityFrameworkCore;
using MoodApp.Server.Models;

public class MoodContext : DbContext
{
    public MoodContext(DbContextOptions<MoodContext> options) : base(options) { }
    public DbSet<MoodEntry> MoodEntries => Set<MoodEntry>();
}