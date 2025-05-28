using SchoolManager.Models;

namespace SchoolManager.Interfaces
{
    public interface IRoleService
    {
        Task<IEnumerable<Roles>> GetAllRolesAsync();
        Task<Roles> GetRoleByIdAsync(Guid roleId);
        Task<Roles> AddRoleAsync(Roles role);
        Task<Roles> UpdateRoleAsync(Roles role, Guid roleId);
        Task DeleteRoleAsync(Guid roleId);
    }
}
