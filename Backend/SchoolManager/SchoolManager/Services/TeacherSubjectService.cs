using Microsoft.EntityFrameworkCore;
using SchoolManager.Data;
using SchoolManager.Interfaces;
using SchoolManager.Models;

namespace SchoolManager.Services
{
    public class TeacherSubjectService : ITeacherSubject
    {
        private readonly SchoolDbContext _context;
        public TeacherSubjectService(SchoolDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TeacherSubjects>> GetAllAsync()
        {
            return await _context.TeacherSubject.Include(t => t.Teacher).Include(t => t.Subject).ToListAsync();
        }
        public async Task<IEnumerable<Subjects>> GetSubjectByTeacherAsync(Guid teacherId)
        {
            return await _context.TeacherSubject
                .Where(t => t.TeacherId == teacherId)
                .Include(t => t.Subject)
                .Select(t => t.Subject)
                .ToListAsync();
        }
        public async Task<IEnumerable<Teachers>> GetTeacherBySubjectAsync(Guid subjectId)
        {
            return await _context.TeacherSubject
                .Where(t => t.SubjectId == subjectId)
                .Include(t => t.Teacher)
                .Select(t => t.Teacher)
                .ToListAsync();
        }
        public async Task AddTeacherSubjectAsync(Guid teacherId, List<Guid> subjectIds)
        {
            var oldSubjects = _context.TeacherSubject.Where(x => x.TeacherId == teacherId);
            _context.TeacherSubject.RemoveRange(oldSubjects);

            foreach (var subjectId in subjectIds)
            {
                _context.TeacherSubject.Add(new TeacherSubjects
                {
                    TeacherId = teacherId,
                    SubjectId = subjectId
                });
            }

            await _context.SaveChangesAsync();
        }
    }
}
