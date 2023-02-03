using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class AreaUpdateDto
    {
        [Required]
        public string ArNameNo { get; set; }
        [Required]
        public string ArName { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int LevelId { get; set; }
        public DateTime LastModified { get; set; } = DateTime.Now;

        public string LastModifiedAt { 
            get{
                return LastModified.ToString("MM/dd/yyyy hh:mm:ss");
            }
            set{}
        }
    }
}