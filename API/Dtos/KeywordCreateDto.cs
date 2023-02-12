using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Core.Entities;

namespace API.Dtos
{
    public class KeywordCreateDto
    {
        [Required]
        public string KeywordName { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public Guid LevelId { get; set; }
        
        [JsonIgnore]
        public DateTime Created { get; set; } = DateTime.Now;

        public string CreatedAt {
             
            get{
                return Created.ToString("MM/dd/yyyy hh:mm:ss");
            }
            set{}
        }

        [Required]
        public List<Area> Areas { get; set; } 
            = new List<Area>();
    }
}