using System.Text.Json.Serialization;

namespace Core.Entities
{
    public class Parameter : BaseEntity
    {
        public string LetterName { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastModified { get; set; } = DateTime.Now;
        public Area Area { get; set; }
        public int AreaId { get; set; }
        public List<TheFile> TheFiles { get; set; } = new List<TheFile>();
    }
}