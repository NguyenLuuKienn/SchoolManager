using SchoolManager.Models;

namespace SchoolManager.Interfaces
{
    public interface IAccountService
    {
        Task<IEnumerable<Users>> GetAllUserAsync();
        Task<Users> GetUserByIdAsync(Guid userId);
        Task<Users> AddUserAsync(Users user);
        Task<Users> UpdateUserAsync(Users user, Guid userId);
        Task DeleteUserAsync(Guid userId);

    }
}
