using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManager.Interfaces;
using SchoolManager.Models;

namespace SchoolManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectService _subjectService;
        public SubjectController(ISubjectService subjectService)
        {
            _subjectService = subjectService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllSubject([FromQuery] int PageNumber = 1, [FromQuery] int PageSize = 10)
        {
            var subject = await _subjectService.GetAllSubjectAsync(PageNumber, PageSize);
            return Ok(subject);
        }
        [HttpGet("{subjectId}")]
        public async Task<IActionResult> GetSubjectById(Guid subjectId)
        {
            var subject = await _subjectService.GetSubjectByIdAsync(subjectId);
            if (subject == null) return NotFound();
            return Ok(subject);
        }
        [HttpPost]
        public async Task<IActionResult> AddSubject([FromBody] Subjects subject)
        {
            if (subject == null) return BadRequest();
            var newSubject = await _subjectService.AddSubjectAsync(subject);
            return CreatedAtAction(nameof(GetSubjectById), new { subjectId = newSubject.SubjectId }, newSubject);
        }
        [HttpPut("{subjectId}")]
        public async Task<IActionResult> UpdateSubject(Guid subjectId, [FromBody] Subjects subject)
        {
            if(subject == null || subjectId != subject.SubjectId)
            {
                return BadRequest();
            }    
            var updateSubject = await _subjectService.UpdateSubjectAsync(subjectId, subject);
            if (updateSubject == null)
                return NotFound("Môn học không tồn tại!");
            return Ok(new { message = "Cập nhật thành công!", subject = updateSubject });

        }
        [HttpDelete("{subjectId}")]
        public async Task<IActionResult> DeleteSubject(Guid subjectId)
        {
            await _subjectService.DeleteSubjectAsync(subjectId);
            return Ok("Xoá thành công");
        }
    }
}
