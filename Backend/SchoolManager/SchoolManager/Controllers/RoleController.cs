using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManager.Interfaces;
using SchoolManager.Models;

namespace SchoolManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _roleService.GetAllRolesAsync();
            return Ok(roles);
        }
        [HttpGet("{roleId}")]
        public async Task<IActionResult> GetRoleById(Guid roleId)
        {
            var role = await _roleService.GetRoleByIdAsync(roleId);
            if (role == null) return NotFound();
            return Ok(role);
        }
        [HttpPost]
        public async Task<IActionResult> AddRole([FromBody] Roles role)
        {
            if (role == null) return BadRequest();
            var newRole = await _roleService.AddRoleAsync(role);
            return CreatedAtAction(nameof(GetRoleById), new { roleId = newRole.RoleId }, newRole);
        }
        [HttpPut("{roleId}")]
        public async Task<IActionResult> UpdateRole(Guid roleId, [FromBody] Roles role)
        {
            if (roleId != role.RoleId || role == null)
                return BadRequest();

            var updatedRole = await _roleService.UpdateRoleAsync(role, roleId);

            if (updatedRole == null)
                return NotFound("Role không tồn tại.");

            return Ok(new {massage = "Cập nhật thành công", role = updatedRole});
        }

        [HttpDelete("{roleId}")]
        public async Task<IActionResult> DeleteRole(Guid roleId)
        {
            await _roleService.DeleteRoleAsync(roleId);
            return Ok("Xoá thành công");
        }
    }
}
