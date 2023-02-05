using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class AreaCreateDto
    {
        [Required]
        public string ArNameNo { get; set; }
        [Required]
        public string ArName { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public Guid LevelId { get; set; }
        public string FacultyUserId { get; set; }
        
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