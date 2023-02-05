using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class FileRepoCreateDto
    {
        public Guid Id { get; set; }
        public string Url { get; set; }
        public Guid TheFileId { get; set; }
    }
}