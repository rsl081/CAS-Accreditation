using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Scheme : BaseEntity
    {
        public string SchemeName { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastModified { get; set; } = DateTime.Now;
        public SysImpOutpt SysImpOutpt { get; set; }
        public Guid SysImpOutptId { get; set; }
        public List<TheFile> TheFiles { get; set; } = new List<TheFile>();
    
        public Scheme(){}

        public Scheme(string schemeName)
        {
            SchemeName = schemeName;
        }

    }
}