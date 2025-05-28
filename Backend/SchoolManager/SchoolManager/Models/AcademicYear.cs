using System.ComponentModel.DataAnnotations;

namespace SchoolManager.Models
{
    public class AcademicYear
    {
        [Key]
        public Guid AcademicYearId { get; set; }
        [Required]
        public string NameAcademicYear { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ICollection<WeekSchedule> Weeks { get; set; }
    }
}
