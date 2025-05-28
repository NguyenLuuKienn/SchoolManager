using Microsoft.EntityFrameworkCore;
using SchoolManager.Data;
using SchoolManager.Interfaces;
using SchoolManager.Models;
namespace SchoolManager.Services
{
    public class AccountService : IAccountService
    {
        private readonly SchoolDbContext _context;
        public AccountService(SchoolDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Users>> GetAllUserAsync()
        {
            return await _context.User.ToListAsync();
        }
        public async Task<Users> GetUserByIdAsync(Guid userId)
        {
            return await _context.User.FindAsync(userId);
        }
        public async Task<Users> AddUserAsync(Users user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<Users> UpdateUserAsync(Users user, Guid userId)
        {
            var existingUser = await _context.User.FindAsync(userId);
            if (existingUser == null) return null;
            
            existingUser.UserName = user.UserName;
            existingUser.Email = user.Email;
            existingUser.Password = user.Password;
            existingUser.Role = user.Role;
            await _context.SaveChangesAsync();
            return existingUser;
        }
        public async Task DeleteUserAsync(Guid userId)
        {
            var user = await _context.User.FindAsync(userId);
            if (user != null)
            {
                _context.User.Remove(user);
                await _context.SaveChangesAsync();
            }
        }
    }
}
