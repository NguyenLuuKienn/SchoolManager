using System.ComponentModel.DataAnnotations;

namespace SchoolManager.Models
{
    public class Grades
    {
        [Key]
        public Guid GradeId { get; set; }
        public Guid StudentId { get; set; }
        public Guid SubjectId { get; set; }
        public double Score { get; set; }

        public Students Student { get; set; }
        public Subjects Subject { get; set; }
    }
}
