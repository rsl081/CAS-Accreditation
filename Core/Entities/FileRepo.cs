using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class FileRepo : BaseEntity
    {
        public string Url { get; set; }
        public string PublicId { get; set; }
        
        public TheFile TheFile { get; set; }
        
        public Guid TheFileId { get; set; }
    }
}