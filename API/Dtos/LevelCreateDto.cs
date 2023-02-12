using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Core.Entities;

namespace API.Dtos
{
    public class LevelCreateDto
    {
        [Required]
        public string LevelName { get; set; }
        [Required]
        public string Name { get; set; }
        
        [JsonIgnore]
        public DateTime Created { get; set; } = DateTime.Now;

        public string CreatedAt {
             
            get{
                return Created.ToString("MM/dd/yyyy hh:mm:ss");
            }
            set{}
        }

        [Required]
        public List<Keyword> Keywords { get; set; } 
            = new List<Keyword>();

    }
}