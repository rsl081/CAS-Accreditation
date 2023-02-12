using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Dtos.SIO
{
    public class SystemCreateDto
    {
        [Required]
        public string SystemName { get; set; }
        public string Name { get; set; }
        [Required]
        public Guid ParameterId { get; set; }
        [JsonIgnore]
        public DateTime Created { get; set; } = DateTime.Now;

        public string CreatedAt { 
            get{
                return Created.ToString("MM/dd/yyyy hh:mm:ss");
            }
            set{}
        }
    }
}