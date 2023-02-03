using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class UserUpdateDto
    {
        [Required]
        public string DisplayName { get; set; }
    }
}