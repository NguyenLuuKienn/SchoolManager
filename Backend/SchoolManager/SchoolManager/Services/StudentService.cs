using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Abstractions;
using SchoolManager.Data;
using SchoolManager.Interfaces;
using SchoolManager.Models;

namespace SchoolManager.Services
{
    public class StudentService : IStudentService
    {
        private readonly SchoolDbContext _context;
        public StudentService(SchoolDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Students>> GetAllStudentAsync(int PageNumber, int PageSize)
        {
            return await _context.Student.Include(s => s.Class).OrderBy(s => s.FullName).Skip((PageNumber - 1) * PageSize).Take(PageSize).ToListAsync();
        }
        public async Task<Students> GetStudentByIdAsync(Guid studentId)
        {
            return await _context.Student.Include(s => s.Class).FirstOrDefaultAsync(s => s.StudentId == studentId);
        }
        public async Task<Students> AddStudentAsync(Students student)
        {
            
            string newStudentCode = await StudentCode(student.SchoolYear, student.Course);
            var newStudent = new Students
            {
                StudentId = Guid.NewGuid(),
                StudentCode = newStudentCode,
                FullName = student.FullName,
                Gender = student.Gender,
                DateOfBirth = student.DateOfBirth,
                Address = student.Address,
                Email = student.Email,
                PhoneNumber = student.PhoneNumber,
                EnrolledDate = student.EnrolledDate,
                ParentEmail = student.ParentEmail,
                ParentName = student.ParentName,
                ParentPhone = student.ParentPhone,
                SchoolYear = student.SchoolYear,
                Course = student.Course,
                ClassId = student.ClassId,
            };
            _context.Student.Add(newStudent);
            await _context.SaveChangesAsync();

            return newStudent;
        }
        public async Task<Students> UpdateStudentAsync(Guid studentId, Students student)
        {
            var existingStudent = await _context.Student.FindAsync(studentId);
            if (existingStudent == null) return null;

            existingStudent.FullName = student.FullName;
            existingStudent.DateOfBirth = student.DateOfBirth;
            existingStudent.Address = student.Address;
            existingStudent.Email = student.Email;
            existingStudent.PhoneNumber = student.PhoneNumber;
            existingStudent.EnrolledDate = student.EnrolledDate;
            existingStudent.Gender = student.Gender;
            existingStudent.ParentEmail = student.ParentEmail;
            existingStudent.ParentPhone = student.ParentPhone;
            existingStudent.SchoolYear = student.SchoolYear;
            existingStudent.Course = student.Course;
            existingStudent.ClassId = student.ClassId;

            await _context.SaveChangesAsync();
            return existingStudent;
        }
        public async Task DeleteStudentAsync(Guid studentId)
        {
            var student = await _context.Student.FindAsync(studentId);
            if(student != null)
            {
                _context.Remove(student);
                await _context.SaveChangesAsync(); 
            }    
        }

        private async Task<string> StudentCode(int SchoolYear, int Course)
        {
            string prefix = $"{SchoolYear}{Course:D2}";
            var lastStudent = await _context.Student
                .Where(s => s.StudentCode.StartsWith(prefix))
                .OrderByDescending(s => s.StudentCode)
                .FirstOrDefaultAsync();
            int nextNumber = 1;
            if (lastStudent != null)
            {
                string lastCode = lastStudent.StudentCode;
                string numberPart = lastCode.Substring(prefix.Length);
                if (int.TryParse(numberPart, out int lastNumber))
                {
                    nextNumber = lastNumber + 1;
                }    
            }    
            string newCode = prefix + nextNumber.ToString("D3");
            return newCode;
        }
    }
}
