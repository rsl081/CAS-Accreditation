using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ImplementationsWithParamsSpec : 
        BaseSpecification<TheImplementation>
    {
        public ImplementationsWithParamsSpec(FileRepoSpecParams fileRepoSpecParams, 
                Guid? parameterId) 
            : base(x => 
            (string.IsNullOrEmpty(fileRepoSpecParams.Search) ||
                x.Name.ToLower().Contains(fileRepoSpecParams.Search) ||
            string.IsNullOrEmpty(fileRepoSpecParams.Search) ||
                x.ImpleName.ToLower().Contains(fileRepoSpecParams.Search) ||
            string.IsNullOrEmpty(fileRepoSpecParams.Search))
                && 
            (!parameterId.HasValue || x.ParameterId == parameterId))
        {
            AddInclude(x => x.Parameter);
        }


        public ImplementationsWithParamsSpec(Guid id) 
            : base(x => x.Id == id)
        {
            AddInclude(x => x.Parameter);
        }
    }
}