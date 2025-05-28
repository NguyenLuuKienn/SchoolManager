using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManager.Interfaces;
using SchoolManager.Models;

namespace SchoolManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            var user = await _accountService.GetAllUserAsync();
            return Ok(user);
        }
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUserById(Guid userId)
        {
            var user = await _accountService.GetUserByIdAsync(userId);
            if (user == null) return NotFound();
            return Ok(user);
        }
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] Users user)
        {
            if (user == null) return BadRequest(); 

            var newUser = await _accountService.AddUserAsync(user);
            return CreatedAtAction(nameof(GetUserById), new { userId = newUser.UserId }, newUser);
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUser(Guid userId, [FromBody] Users user)
        {
            if (userId != user.UserId || user == null)
                return BadRequest();

            var updatedUser = await _accountService.UpdateUserAsync(user, userId);

            if (updatedUser == null)
                return NotFound("User không tồn tại!");

            return Ok(new { massage = "Cập nhật thành công", user = updatedUser });
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {
            await _accountService.DeleteUserAsync(userId);
            return Ok("Xoá thành công");
        }
    }
}
