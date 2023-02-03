using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Core.Entities;

namespace API.Dtos
{
    public class LevelToReturn
    {
        public int Id { get; set; }
        public string LevelName { get; set; }
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

    }
}