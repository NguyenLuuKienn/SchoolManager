using System.ComponentModel.DataAnnotations;

namespace SchoolManager.Models
{
    public class Roles
    {
        [Key]
        public Guid RoleId { get; set; }
        [Required]
        public string RoleName { get; set; }

        public ICollection<Users>? Users { get; set; }
    }
}
