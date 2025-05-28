using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SchoolManager.Models
{
    public class TeacherSubjects
    {
        [Key]
        public Guid TeacherSubjectId { get; set; }
        public Guid TeacherId { get; set; }
        public Guid SubjectId { get; set; }

        [JsonIgnore]
        public Teachers Teacher { get; set; }
        [JsonIgnore]
        public Subjects Subject { get; set; }
    }
}
