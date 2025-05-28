using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManager.Interfaces;
using SchoolManager.Models;

namespace SchoolManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllStudent([FromQuery] int PageNumber = 1, [FromQuery] int PageSize = 10)
        {
            var student = await _studentService.GetAllStudentAsync(PageNumber, PageSize);
            return Ok(student);
        }
        [HttpGet("{studentId}")]
        public async Task<IActionResult> GetStudentById(Guid studentId)
        {
            var student = await _studentService.GetStudentByIdAsync(studentId);
            if (student == null) return NotFound();
            return Ok(student);
        }
        [HttpPost]
        public async Task<IActionResult> AddStudent([FromBody] Students student)
        {
            if (student == null) return BadRequest();
            var newStudent = await _studentService.AddStudentAsync(student);
            return CreatedAtAction(nameof(GetStudentById), new { studentId = newStudent.StudentId }, newStudent);
        }
        [HttpPut("{studentId}")]
        public async Task<IActionResult> UpdateStudent(Guid studentId, [FromBody] Students student)
        {
            if (studentId != student.StudentId || studentId == null)
                return BadRequest();
            var updateStudent = await _studentService.UpdateStudentAsync(studentId, student);
            if (updateStudent == null)
                return NotFound("Học sinh không tồn tại");
            return Ok(new { message = "Cập nhật thành công", student = updateStudent });
        }
        [HttpDelete("{studentId}")]
        public async Task<IActionResult> DeleteStudent(Guid studentId)
        {
            await _studentService.DeleteStudentAsync(studentId);
            return Ok("Xoá thành công");
        }
    }
}
