using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManager.Interfaces;
using SchoolManager.Models;

namespace SchoolManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        private readonly IGrandeService _grandeService;
        public GradeController(IGrandeService grandeService)
        {
            _grandeService = grandeService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllGrade()
        {
            var grade = _grandeService.GetAllGradeAsync();
            return Ok();
        }
        [HttpGet("{gradeId}")]
        public async Task<IActionResult> GetGradeById(Guid gradeId)
        {
            var grade = _grandeService.GetGradeByIdAsync(gradeId);
            if (grade == null) return NotFound();
            return Ok(grade);
        }
        [HttpPost]
        public async Task<IActionResult> AddGrade([FromBody] Grades grade)
        {
            if (grade == null) return BadRequest();
            var newGrade = _grandeService.AddGradeAsync(grade);
            return CreatedAtAction(nameof(GetGradeById), new { gradeId = grade.GradeId }, newGrade);
        }
        [HttpPut("{gradeId}")]
        public async Task<IActionResult> UpdateGrade(Guid gradeId, [FromBody] Grades grade)
        {
            if(gradeId != grade.GradeId || grade == null)
                return BadRequest();
            var updateGrade = _grandeService.UpdateGradeAsync(gradeId, grade);
            if (updateGrade == null) return NotFound("Điểm không tồn tại");
            return Ok(new {message = "Cập nhật thành công", grade = updateGrade});
        }
        [HttpDelete("{gradeId}")]
        public async Task<IActionResult> DeleteGrade(Guid gradeId)
        {
            await _grandeService.DeleteGradeAsync(gradeId);
            return Ok("Xoá thành công");
        }
    }
}
