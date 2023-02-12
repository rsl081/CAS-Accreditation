using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class SysImpOutpt : BaseEntity
    {
        public string SystemName { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastModified { get; set; } = DateTime.Now;
        public Parameter Parameter { get; set; }
        public Guid ParameterId { get; set; }
    }
}