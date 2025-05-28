using SchoolManager.Models;

namespace SchoolManager.Interfaces
{
    public interface ITeacherSubject
    {
        Task<IEnumerable<TeacherSubjects>> GetAllAsync();
        Task<IEnumerable<Subjects>> GetSubjectByTeacherAsync(Guid teacherId);
        Task<IEnumerable<Teachers>> GetTeacherBySubjectAsync(Guid subjectId);
        Task AddTeacherSubjectAsync(Guid teacherId, List<Guid> subjectId);
    }
}
