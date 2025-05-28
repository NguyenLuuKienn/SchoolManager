using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SchoolManager.Models
{
    public class Teachers
    {
        [Key]
        public Guid TeacherId { get; set; }
        public Guid? UserId { get; set; }
        [Required]
        public string FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public TeacherGender Gender { get; set; }
        public string Email { get; set; }
        public DateTime DateOfHire { get; set; }

        [JsonIgnore]
        public Users? User { get; set; }
        public ICollection<TeacherSubjects>? TeacherSubject { get; set; }
        public ICollection<Schedules>? Schedule { get; set; }
        public ICollection<Salaries>? Salarie { get; set; }
    }
    public enum TeacherGender
    {
        Female = 0,
        Male = 1
    }
}
