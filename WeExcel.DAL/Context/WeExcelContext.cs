using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WeExcel.DAL.Models;

namespace WeExcel.DAL.Context
{
    public class WeExcelContext : IdentityDbContext
    {
        public WeExcelContext(DbContextOptions<WeExcelContext> options): base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        //entities
        public DbSet<Employee> Employees { get; set; }
    }
}
