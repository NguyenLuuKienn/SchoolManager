using Microsoft.EntityFrameworkCore;
using SchoolManager.Data;
using SchoolManager.Interfaces;
using SchoolManager.Models;

namespace SchoolManager.Services
{
    public class GradeService : IGrandeService
    {
        private readonly SchoolDbContext _context;
        public GradeService(SchoolDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Grades>> GetAllGradeAsync()
        {
            return await _context.Grade.ToListAsync();
        }
        public async Task<Grades> GetGradeByIdAsync(Guid gradeId)
        {
            return await _context.Grade.FindAsync(gradeId);
        }
        public async Task<Grades> AddGradeAsync(Grades grade)
        {
            _context.Grade.Add(grade);
            await _context.SaveChangesAsync();
            return grade;
        }
        public async Task<Grades> UpdateGradeAsync(Guid gradeId, Grades grade)
        {
            var existingGrade = await _context.Grade.FindAsync(gradeId);
            if (existingGrade == null) return null;
            existingGrade.Score = grade.Score;
            await _context.SaveChangesAsync();
            return existingGrade;
        }
        public async Task DeleteGradeAsync(Guid gradeId)
        {
            var grade = await _context.Grade.FindAsync(gradeId);
            if (grade != null)
            {
                _context.Grade.Remove(grade);
                await _context.SaveChangesAsync();
            }    
        }
    }
}
