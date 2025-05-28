using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SchoolManager.Models
{
    public class Classes
    {
        [Key]
        public Guid ClassId { get; set; }
        [Required]
        public string ClassName { get; set; }
        public string GrandeLevel { get; set; }
        public Guid? HomroomTeacherId { get; set; }
        public Teachers? HomeroomTeacher { get; set; }
        public Guid? RoomId { get; set; }
        public Room? Room { get; set; }
        public Shift Shift { get; set; }

        [JsonIgnore]
        public ICollection<Students>? Student { get; set; } = new List<Students>();
        public ICollection<Schedules>? Schedule { get; set; } = new List<Schedules>();
    }
    public enum Shift
    {
        Morning = 0,
        Afternoon = 1,
        Evening = 2,
    }
}
