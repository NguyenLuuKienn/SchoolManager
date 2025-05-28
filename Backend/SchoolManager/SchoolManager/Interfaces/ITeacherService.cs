using SchoolManager.Models;

namespace SchoolManager.Interfaces
{
    public interface ITeacherService
    {
        Task<IEnumerable<Teachers>> GetAllTeachersAsync(int PageNumber, int PageSize);
        Task<Teachers> GetTeacherByIdAsync(Guid teacherId);
        Task<Teachers> AddTeacherAsync(Teachers teacher);
        Task<Teachers> UpdateTeacherAsync(Teachers teacher, Guid teacherId);
        Task DeleteTeacherAsync(Guid teacherId);

    }
}
