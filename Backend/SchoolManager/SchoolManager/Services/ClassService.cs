using Microsoft.EntityFrameworkCore;
using SchoolManager.Data;
using SchoolManager.Interfaces;
using SchoolManager.Models;

namespace SchoolManager.Services
{
    public class ClassService : IClassService
    {
        private readonly SchoolDbContext _context;
        public ClassService(SchoolDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Classes>> GetAllClassesAsync(int PageNumber, int PageSize)
        {
            return await _context.Classe.OrderBy(c => c.ClassName).Skip((PageNumber - 1) * PageSize).Take(PageSize).ToListAsync();
        }
        public async Task<Classes> GetClassByIdAsync(Guid classId)
        {
            return await _context.Classe.FindAsync(classId);
        }
        public async Task<Classes> AddClassAsync(Classes classes)
        {
            _context.Classe.Add(classes);
            await _context.SaveChangesAsync();
            return classes;
        }
        public async Task<Classes> UpdateClassAsync(Classes classes, Guid classId)
        {
            var existingClass = await _context.Classe.FindAsync(classId);
            if (existingClass == null) return null;

            existingClass.ClassName = classes.ClassName;
            existingClass.GrandeLevel = classes.GrandeLevel;

            await _context.SaveChangesAsync();
            return existingClass;
        }
        public async Task DeleteClassAsync(Guid classId)
        {
            var classes = await _context.Classe.FindAsync(classId);
            if (classes != null)
            {
                _context.Classe.Remove(classes);
                await _context.SaveChangesAsync();
            }
        }
    }
}
