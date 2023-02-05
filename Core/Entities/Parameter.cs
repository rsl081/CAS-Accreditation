using System.Text.Json.Serialization;

namespace Core.Entities
{
    public class Parameter : BaseEntity
    {
        public string ParamName { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastModified { get; set; } = DateTime.Now;
        public Area Area { get; set; }
        public Guid AreaId { get; set; }
        public List<TheSystem> TheSystems { get; set; } = new List<TheSystem>();
        public List<TheImplementation> TheImplementations { get; set; } = new List<TheImplementation>();
        public List<TheOutput> TheOutputs { get; set; } = new List<TheOutput>();
    }
}