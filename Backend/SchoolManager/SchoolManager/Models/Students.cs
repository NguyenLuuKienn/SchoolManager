using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SchoolManager.Models
{
    public class Students
    {
        [Key]
        public Guid StudentId { get; set; }
        
        public string FullName { get; set; }
        public string? StudentCode { get; set; }
        public DateTime DateOfBirth { get; set; }
        public StudentGender Gender { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

        public Guid ClassId { get; set; }
        public Classes? Class { get; set; }

        public string ParentName { get; set; }    
        public string ParentPhone { get; set; }   
        public string ParentEmail { get; set; }

        public DateTime EnrolledDate { get; set; }
        public int SchoolYear { get; set; }
        public int Course { get; set; }
        public bool IsActive { get; set; } = true;

        public ICollection<Grades>? Grade { get; set; } = new List<Grades>();

    }
    public enum StudentGender
    {
        Female = 0,
        Male = 1
    }
}
