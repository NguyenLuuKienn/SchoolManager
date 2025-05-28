using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManager.Interfaces;
using SchoolManager.Models;

namespace SchoolManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private readonly IClassService _classService;
        public ClassController(IClassService classService)
        {
            _classService = classService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllClasses([FromQuery] int PageNumber = 1, [FromQuery] int PageSize = 10)
        {
            var classes = await _classService.GetAllClassesAsync(PageNumber, PageSize);
            return Ok(classes);
        }
        [HttpGet("{classId}")]
        public async Task<IActionResult> GetClassById(Guid classId)
        {
            var classes = await _classService.GetClassByIdAsync(classId);
            if (classes == null) return NotFound();
            return Ok(classes);
        }
        [HttpPost]
        public async Task<IActionResult> AddClass([FromBody] Classes classes)
        {
            if (classes == null) return BadRequest();
            var newClass = await _classService.AddClassAsync(classes);
            return CreatedAtAction(nameof(GetClassById), new { classId = newClass.ClassId }, newClass);
        }
        [HttpPut("{classId}")]
        public async Task<IActionResult> UpdateClass(Guid classId, [FromBody] Classes classes)
        {
            if (classId != classes.ClassId || classes == null)
                return BadRequest();

            var updatedClass = await _classService.UpdateClassAsync(classes, classId);

            if (updatedClass == null)
                return NotFound("Lớp học không tồn tại.");

            return Ok(new { massage = "Cập nhật thành công", classes = updatedClass });
        }
        [HttpDelete("{classId}")]
        public async Task<IActionResult> DeleteClass(Guid classId)
        {
            await _classService.DeleteClassAsync(classId);
            return Ok("Xoá thành công");
        }
    }
}
