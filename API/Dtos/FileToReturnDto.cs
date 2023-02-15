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
        public Guid SchemeId { get; set; }
        public string Scheme { get; set; }
        public string  SysImpOutpt { get; set; }
        public string Parameter { get; set; }
        public string Area { get; set; }

        //   Scheme = f.Scheme.SchemeName,
        //                             SysImpOutpt = f.Scheme.SysImpOutpt.SystemName,
        //                             Parameter = f.Scheme.SysImpOutpt.Parameter.ParamName,
        //                             Area =

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