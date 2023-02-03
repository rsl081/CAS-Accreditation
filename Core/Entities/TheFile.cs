using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

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

        [JsonIgnore]
        public Parameter Parameter { get; set; }
        public int ParameterId { get; set; }
    }
}