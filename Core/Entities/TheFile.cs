using System.Text.Json.Serialization;

namespace Core.Entities
{
    public class TheFile : BaseEntity
    {
        public string FacultyName { get; set; }
        public string FileName { get; set; }
        public string Size { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastModified { get; set; } = DateTime.Now;
        public FileRepo FileRepo { get; set; }
        public List<TheSystem> TheSystems { get; set; } = new List<TheSystem>();
        public List<TheImplementation> TheImplementations { get; set; } = new List<TheImplementation>();
        public List<TheOutput> TheOutputs { get; set; } = new List<TheOutput>();
        public bool Status { get; set; }
    }
}