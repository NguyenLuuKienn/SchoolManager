using System.ComponentModel.DataAnnotations;

namespace SchoolManager.Models
{
    public class Schedules
    {
        [Key]
        public Guid ScheduleId { get; set; }
        public Guid WeekId { get; set; }
        public Guid ClassId { get; set; }
        public Guid SubjectId { get; set; }
        public Guid TeacherId { get; set; }
        public Guid? RoomId { get; set; }

        [Range(2, 7)]
        public int DateOfWeek { get; set; }

        [Range(1,10)]
        public int Lesson { get; set; }

        public string? Note { get; set; }

        public WeekSchedule Week { get; set; }
        public Classes Class { get; set; }
        public Subjects Subject { get; set; }
        public Teachers Teacher { get; set; }
        public Room? Room { get; set; }
    }
}
