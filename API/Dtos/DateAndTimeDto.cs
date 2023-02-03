using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class DateAndTimeDto
    {
        public DateTime Created { get; set; } = DateTime.Now;
    }
}