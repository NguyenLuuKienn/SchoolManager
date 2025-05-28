
using System.ComponentModel.DataAnnotations;

namespace SchoolManager.Models
{
    public class WeekSchedule
    {
        [Key]
        public Guid WeekId { get; set; }
        public int WeekNumber { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsScheduled { get; set; } = false;
        public bool IsPublished { get; set; } = false;

        [Required]
        public Guid AcademicYearId { get; set; }
        public AcademicYear AcademicYear { get; set; }
        public ICollection<Schedules> Schedules { get; set; }
    }
}
