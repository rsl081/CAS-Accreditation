using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class AreaFacultyUserIdDto
    {
        [Required]
        public string FacultyUserId { get; set; }
        public string Name { get; set; }
    }
}