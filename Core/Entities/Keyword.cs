using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Keyword : BaseEntity
    {
        public string KeywordName { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastModified { get; set; } = DateTime.Now;
        public Level Level { get; set; }
        public Guid LevelId { get; set; }
        public List<Area> Areas { get; set; } = new List<Area>();
    }
}