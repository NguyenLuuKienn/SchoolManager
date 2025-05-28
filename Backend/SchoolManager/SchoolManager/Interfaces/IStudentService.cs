using SchoolManager.Models;

namespace SchoolManager.Interfaces
{
    public interface IStudentService
    {
        Task<IEnumerable<Students>> GetAllStudentAsync(int PageNumber, int PageSize);
        Task<Students> GetStudentByIdAsync(Guid studentId);
        Task<Students> AddStudentAsync(Students student);
        Task<Students> UpdateStudentAsync(Guid studentId, Students student);
        Task DeleteStudentAsync(Guid studentId);
    }
}
