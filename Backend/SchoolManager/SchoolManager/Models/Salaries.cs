using System.ComponentModel.DataAnnotations;

namespace SchoolManager.Models
{
    public class Salaries
    {
        [Key]
        public Guid SalaryId { get; set; }
        public Guid TeacherId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }

        public Teachers Teacher { get; set; }
    }
}
