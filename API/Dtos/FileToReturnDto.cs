using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class FileToReturnDto
    {
        public Guid Id { get; set; }
        public string FileName { get; set; }
        public string Name { get; set; }
        public string Size { get; set; }
        public string FileRepo { get; set; }
        public Guid ParameterId { get; set; }

        [JsonIgnore]
        public DateTime Created { get; set; }
        public string CreatedAt { 
            get{
                return Created.ToString("MM/dd/yyyy hh:mm:tt");
            }
            set{}
        }

        [JsonIgnore]
        public DateTime LastModified { get; set; }
        public string LastModifiedAt { 
            get{
                return LastModified.ToString("MM/dd/yyyy hh:mm:tt");
            }
            set{}
        }

    }
}