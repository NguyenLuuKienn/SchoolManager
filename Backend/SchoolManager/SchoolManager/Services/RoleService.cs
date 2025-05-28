using Microsoft.EntityFrameworkCore;
using SchoolManager.Data;
using SchoolManager.Interfaces;
using SchoolManager.Models;

namespace SchoolManager.Services
{
    public class RoleService : IRoleService
    {
        private readonly SchoolDbContext _context;
        public RoleService(SchoolDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Roles>> GetAllRolesAsync()
        {
            return await _context.Role.Include(r => r.Users).ToListAsync();
        }
        public async Task<Roles> GetRoleByIdAsync(Guid roleId)
        {
            return await _context.Role.FindAsync(roleId);
        }
        public async Task<Roles> AddRoleAsync(Roles role)
        {
            _context.Role.Add(role);
            await _context.SaveChangesAsync();
            return role;
        }
        public async Task<Roles> UpdateRoleAsync(Roles role, Guid roleId)
        {
            var existingRole = await _context.Role.FindAsync(roleId);
            if (existingRole == null) return null;

            existingRole.RoleName = role.RoleName;
            await _context.SaveChangesAsync();
            return existingRole;
        }
        public async Task DeleteRoleAsync(Guid roleId)
        {
            var role = await _context.Role.FindAsync(roleId);
            if (role != null)
            {
                _context.Role.Remove(role);
                await _context.SaveChangesAsync();
            }
        }
    }
}
