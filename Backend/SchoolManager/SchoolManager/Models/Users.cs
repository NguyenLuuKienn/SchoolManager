using Microsoft.AspNetCore.Authorization.Infrastructure;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SchoolManager.Models
{
    public class Users
    {
        [Key]
        public Guid UserId { get; set; }        
        public Guid RoleId { get; set; }
        [Required]
        public string UserName { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }

        [JsonIgnore]        
        public Teachers? Teacher { get; set; }

        [JsonIgnore]
        public Roles? Role { get; set; }

    }
}
