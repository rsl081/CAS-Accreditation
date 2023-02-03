using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{

    public class ParamsWithFilesSpec : BaseSpecification<Parameter>
    {
        
        public ParamsWithFilesSpec(FileRepoSpecParams fileRepoSpecParams,int? areaId) : base(x => 
            (string.IsNullOrEmpty(fileRepoSpecParams.Search) ||
                x.Name.ToLower().Contains(fileRepoSpecParams.Search) ||
            string.IsNullOrEmpty(fileRepoSpecParams.Search) ||
                x.LetterName.ToLower().Contains(fileRepoSpecParams.Search) ||
            string.IsNullOrEmpty(fileRepoSpecParams.Search))
                && 
            (!areaId.HasValue || x.AreaId == areaId))
        {
            AddInclude(x => x.TheFiles);
        }

        public ParamsWithFilesSpec(int id) 
            : base(x => x.Id == id)
        {
            //* To Show Levels, Its okay to not include
            AddInclude(x => x.TheFiles);
        }

    }

}