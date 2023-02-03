using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Dtos
{
    public class AreaToReturn
    {
        public int Id { get; set; }
        public string ArNameNo { get; set; }
        public string ArName { get; set; }
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


        public int LevelId { get; set; }

        public string FacultyUserId { get; set; }
    }
}