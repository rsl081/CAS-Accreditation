using System.Text.Json.Serialization;

namespace Core.Entities
{
    public class    TheFile : BaseEntity
    {
        public string FacultyName { get; set; }
        public string FileName { get; set; }
        public string Size { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastModified { get; set; } = DateTime.Now;
        public FileRepo FileRepo { get; set; }
        [JsonIgnore]
        public Scheme Scheme { get; set; }
        public Guid SchemeId { get; set; }
        public bool Status { get; set; }
    }
}