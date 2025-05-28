using SchoolManager.Models;

namespace SchoolManager.Interfaces
{
    public interface IClassService
    {
        Task<IEnumerable<Classes>> GetAllClassesAsync(int PageNumber, int PageSize);
        Task<Classes> GetClassByIdAsync(Guid classId);
        Task<Classes> AddClassAsync(Classes classes);
        Task<Classes> UpdateClassAsync(Classes classes, Guid classId);
        Task DeleteClassAsync(Guid classId);
    }
}
