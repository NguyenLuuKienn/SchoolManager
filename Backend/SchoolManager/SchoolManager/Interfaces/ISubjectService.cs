using SchoolManager.Models;

namespace SchoolManager.Interfaces
{
    public interface ISubjectService
    {
        Task<IEnumerable<Subjects>> GetAllSubjectAsync(int PageNumber, int PageSize);
        Task<Subjects> GetSubjectByIdAsync(Guid subjectId);
        Task<Subjects> AddSubjectAsync(Subjects subject);
        Task<Subjects> UpdateSubjectAsync(Guid subjectId, Subjects subject);
        Task DeleteSubjectAsync(Guid subjectId);
    }
}
