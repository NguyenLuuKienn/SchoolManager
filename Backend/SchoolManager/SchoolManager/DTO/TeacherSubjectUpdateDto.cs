namespace SchoolManager.DTO
{
    public class TeacherSubjectUpdateDto
    {
        public Guid TeacherId { get; set; }
        public List<Guid> SubjectIds { get; set; }
    }
}
