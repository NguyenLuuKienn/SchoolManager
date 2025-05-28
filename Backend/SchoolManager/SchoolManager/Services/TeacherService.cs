using Microsoft.EntityFrameworkCore;
using SchoolManager.Data;
using SchoolManager.Interfaces;
using SchoolManager.Models;

namespace SchoolManager.Services
{
    public class TeacherService : ITeacherService
    {
        private readonly SchoolDbContext _context;
        public TeacherService(SchoolDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Teachers>> GetAllTeachersAsync(int PageNumber, int PageSize)
        {
            return await _context.Teacher.Include(t => t.User).Include(t => t.TeacherSubject).OrderBy(t => t.FullName).Skip((PageNumber - 1) * PageSize).Take(PageSize).ToListAsync();
        }
        public async Task<Teachers> GetTeacherByIdAsync(Guid teacherId)
        {
            return await _context.Teacher.FindAsync(teacherId);
        }
        public async Task<Teachers> AddTeacherAsync(Teachers teacher)
        {
            _context.Teacher.Add(teacher);
            await _context.SaveChangesAsync();
            return teacher;
        }
        public async Task<Teachers> UpdateTeacherAsync(Teachers teacher, Guid teacherId)
        {
            var existingTeacher = await _context.Teacher.FindAsync(teacherId);
            if (existingTeacher == null) return null;

            existingTeacher.FullName = teacher.FullName;
            existingTeacher.Gender = teacher.Gender;
            existingTeacher.PhoneNumber = teacher.PhoneNumber;
            existingTeacher.Email = teacher.Email;
            existingTeacher.Address = teacher.Address;
            existingTeacher.DateOfBirth = teacher.DateOfBirth;
            existingTeacher.DateOfHire = teacher.DateOfHire;
            
            await _context.SaveChangesAsync();
            return existingTeacher;
        }
        public async Task DeleteTeacherAsync(Guid teacherId)
        {
            var teacher = await _context.Teacher.FindAsync(teacherId);
            if (teacher != null)
            {
                _context.Teacher.Remove(teacher);
                await _context.SaveChangesAsync();
            }
        }
    }
}
