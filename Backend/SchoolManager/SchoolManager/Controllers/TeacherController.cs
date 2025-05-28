using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManager.Interfaces;
using SchoolManager.Models;

namespace SchoolManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherService _teacherService;

        public TeacherController(ITeacherService teacherService)
        {
            _teacherService = teacherService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTeachers([FromQuery] int PageNumber = 1, [FromQuery] int PageSize = 10)
        {
            var teachers = await _teacherService.GetAllTeachersAsync(PageNumber, PageSize);
            return Ok(teachers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTeacherById(Guid id)
        {
            var teacher = await _teacherService.GetTeacherByIdAsync(id);
            if (teacher == null) return NotFound();
            return Ok(teacher);
        }

        [HttpPost]
        public async Task<IActionResult> AddTeacher([FromBody] Teachers teacher)
        {
            if (teacher == null) return BadRequest();

            var createdTeacher = await _teacherService.AddTeacherAsync(teacher);
            return CreatedAtAction(nameof(GetTeacherById), new { id = createdTeacher.TeacherId }, createdTeacher);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeacher(Guid id, [FromBody] Teachers teacher)
        {
            if (id != teacher.TeacherId || teacher == null)
                return BadRequest();

            var updatedTeacher = await _teacherService.UpdateTeacherAsync(teacher, id);
            if (updatedTeacher == null)
                return NotFound();

            return Ok(new { massage = "Cập nhật thành công", teacher = updatedTeacher });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacher(Guid id)
        {
            await _teacherService.DeleteTeacherAsync(id);
            return Ok("Xoá thành công");
        }
    }
}
