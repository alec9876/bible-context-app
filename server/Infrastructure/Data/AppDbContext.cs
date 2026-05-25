using Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Books> Books {get; set;}
    public DbSet<Sections> Sections {get; set;}
    public DbSet<Users> Users {get; set;}
}