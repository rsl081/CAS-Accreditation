using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class FileUpdateDto
    {
        [Required]
        public string FileName { get; set; }
        public string Name { get; set; }
        [Required]
        public string Size { get; set; }
        [Required]
        public Guid SysImpOutptId { get; set; }
        
        [JsonIgnore]
        public DateTime LastModified { get; set; } = DateTime.Now;

        public string LastModifiedAt { 
            get{
                return LastModified.ToString("MM/dd/yyyy hh:mm:ss");
            }
            set{}
        }
    }
}