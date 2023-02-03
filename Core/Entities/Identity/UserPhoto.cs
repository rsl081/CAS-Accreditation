using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Entities
{
    public class UserPhoto : BaseEntity
    {
        public string Url { get; set; }
        public string PublicId { get; set; }
        
        [JsonIgnore]
        public AppUser AppUser { get; set; }
        public string AppUserId { get; set; }

        public UserPhoto(){}
        
        public UserPhoto(string url)
        {
            Url = url;
        }
    }
}