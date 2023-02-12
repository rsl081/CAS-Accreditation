using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class SchemesWithSysImpOutptSpec : BaseSpecification<Scheme>
    {
        public SchemesWithSysImpOutptSpec(FileRepoSpecParams fileRepoSpecParams, Guid? sysImpOutptId) 
            : base(x => 
            (string.IsNullOrEmpty(fileRepoSpecParams.Search) ||
                x.Name.ToLower().Contains(fileRepoSpecParams.Search) ||
            string.IsNullOrEmpty(fileRepoSpecParams.Search) ||
                x.SchemeName.ToLower().Contains(fileRepoSpecParams.Search) ||
            string.IsNullOrEmpty(fileRepoSpecParams.Search))
                && 
            (!sysImpOutptId.HasValue || x.SysImpOutptId == sysImpOutptId))
        {
            AddInclude(x => x.SysImpOutpt);
        }


        public SchemesWithSysImpOutptSpec(Guid id) 
            : base(x => x.Id == id)
        {
            AddInclude(x => x.SysImpOutpt);
        }
    }
}