using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Dtos.SIO
{
    public class SystemToReturn
    {
        public Guid Id { get; set; }
        public string SystemName { get; set; }
        public string Name { get; set; }
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
        
        public Guid ParameterId { get; set; }
        public Guid TheFileId { get; set; }
    }
}