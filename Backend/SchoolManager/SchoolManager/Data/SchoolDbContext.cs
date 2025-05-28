using Microsoft.EntityFrameworkCore;
using SchoolManager.Models;
namespace SchoolManager.Data
{
    public class SchoolDbContext : DbContext
    {
        public SchoolDbContext(DbContextOptions<SchoolDbContext> options)
            : base(options)
        {
        }

        public DbSet<Users> User { get; set; }
        public DbSet<Classes> Classe { get; set; }
        public DbSet<Teachers> Teacher { get; set; }
        public DbSet<Subjects> Subject { get; set; }
        public DbSet<Students> Student { get; set; }
        public DbSet<TeacherSubjects> TeacherSubject { get; set; }
        public DbSet<Schedules> Schedule { get; set; }
        public DbSet<Salaries> Salarie { get; set; }
        public DbSet<Grades> Grade { get; set; }
        public DbSet<Roles> Role { get; set; }
        public DbSet<AcademicYear> AcademicYear { get; set; }
        public DbSet<WeekSchedule> WeekSchedule { get; set; }
        public DbSet<Room> Room { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId);

            modelBuilder.Entity<Users>()
                .HasOne(u => u.Teacher)
                .WithOne(t => t.User)
                .HasForeignKey<Teachers>(t => t.UserId);
        }

    }
}
