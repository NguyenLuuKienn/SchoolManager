using System.ComponentModel.DataAnnotations;

namespace SchoolManager.Models
{
    public class Room
    {
        [Key]
        public Guid RoomId { get; set; }
        public string RoomName { get; set; }    
        public ICollection<Schedules> Schedules { get; set; }
    }
}
