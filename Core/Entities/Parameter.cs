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
        public List<SysImpOutpt> SysImpOutpts { get; set; } = new List<SysImpOutpt>();
    }   
}