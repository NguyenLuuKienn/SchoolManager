using SchoolManager.Models;

namespace SchoolManager.Interfaces
{
    public interface IGrandeService
    {
        Task<IEnumerable<Grades>> GetAllGradeAsync();
        Task<Grades> GetGradeByIdAsync(Guid gradeId);
        Task<Grades> AddGradeAsync(Grades grade);
        Task<Grades> UpdateGradeAsync(Guid gradeId, Grades grade);
        Task DeleteGradeAsync(Guid gradeId);
    }
}
