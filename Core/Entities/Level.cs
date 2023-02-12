namespace Core.Entities
{
    public class Level : BaseEntity
    {
        public string LevelName { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastModified { get; set; } = DateTime.Now;
        public List<Keyword> Keywords { get; set; } = new List<Keyword>();
    }
}