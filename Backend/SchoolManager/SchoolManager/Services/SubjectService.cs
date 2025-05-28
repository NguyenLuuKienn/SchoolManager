using Microsoft.EntityFrameworkCore;
using SchoolManager.Data;
using SchoolManager.Interfaces;
using SchoolManager.Models;
using System.Security.AccessControl;

namespace SchoolManager.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly SchoolDbContext _context;
        public SubjectService(SchoolDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Subjects>> GetAllSubjectAsync(int PageNumber, int PageSize)
        {
            return await _context.Subject.Include(s => s.TeacherSubject).Include(s => s.Grade).OrderBy(s => s.SubjectName).Skip((PageNumber - 1) * PageSize).Take(PageSize).ToListAsync();
        }
        public async Task<Subjects> GetSubjectByIdAsync(Guid subjectId)
        {
            return await _context.Subject.Include(s => s.TeacherSubject).Include(s => s.Grade).FirstOrDefaultAsync(s => s.SubjectId == subjectId);
        }
        public async Task<Subjects> AddSubjectAsync(Subjects subject)
        {
            _context.Subject.Add(subject);
            await _context.SaveChangesAsync();
            return subject;
        }  
        public async Task<Subjects> UpdateSubjectAsync(Guid subjectId, Subjects subject)
        {
            var existingSubject = await _context.Subject.FindAsync(subjectId);
            if (existingSubject == null) return null;

            existingSubject.SubjectName = subject.SubjectName;
            existingSubject.SubjectCode = subject.SubjectCode;
            existingSubject.Faculty = subject.Faculty;
            existingSubject.Credit = subject.Credit;
            existingSubject.LessionPerWeek = subject.LessionPerWeek;

            await _context.SaveChangesAsync();
            return existingSubject;
        }
        public async Task DeleteSubjectAsync(Guid subjectId)
        {
            var subject = await _context.Subject.FindAsync(subjectId);
            if (subject != null)
            {
                _context.Subject.Remove(subject);
                await _context.SaveChangesAsync();
            }    
        }
    }
}
