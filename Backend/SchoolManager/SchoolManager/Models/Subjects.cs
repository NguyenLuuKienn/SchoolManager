using System.ComponentModel.DataAnnotations;

namespace SchoolManager.Models
{
    public class Subjects
    {
        [Key]
        public Guid SubjectId { get; set; }

        [Required]
        public string SubjectName { get; set; }

        [Required]
        [MaxLength(20)]
        public string SubjectCode { get; set; }

        [Required]
        [MaxLength(100)]
        public string Faculty { get; set; }

        [Range(1, 10)]
        public int Credit { get; set; }

        [Range (1, 50)]
        public int LessionPerWeek { get; set; }

        public ICollection<TeacherSubjects>? TeacherSubject { get; set; }
        public ICollection<Schedules>? Schedule { get; set; }
        public ICollection<Grades>? Grade { get; set; }
    }
}
