using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManager.Interfaces;
using SchoolManager.Models;
using SchoolManager.Services;
using SchoolManager.DTO;

namespace SchoolManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeacherSubjectController : ControllerBase
    {
        private readonly ITeacherSubject _teachersubjectService;
        public TeacherSubjectController(ITeacherSubject teachersubjectService)
        {
            _teachersubjectService = teachersubjectService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var list = await _teachersubjectService.GetAllAsync();
            return Ok(list);
        }
        
        [HttpGet("subject/{subjectId}")]
        public async Task<IActionResult> GetTeacherBySubject(Guid subjectId)
        {
            var list = _teachersubjectService.GetTeacherBySubjectAsync(subjectId);
            return Ok(list);
        }
        [HttpGet("teacher/{teacherId}")]
        public async Task<IActionResult> GetSubjectByTeacher(Guid teacherId)
        {
            var list = _teachersubjectService.GetSubjectByTeacherAsync(teacherId);
            return Ok(list);
        }
        [HttpPost]
        public async Task<IActionResult> AddTeacherSubject([FromBody] TeacherSubjectUpdateDto dto)
        {
            await _teachersubjectService.AddTeacherSubjectAsync(dto.TeacherId, dto.SubjectIds);
            return Ok(new {massage = "Thêm thành công"});
        }
        

    }
}
