using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class AreasWithParamsSpec : BaseSpecification<Area>
    {

        // public AreasWithParamsSpec(FileRepoSpecParams areaSpecParam, int? levelId) : base(x => 
        //     (!levelId.HasValue || x.LevelId == levelId))
        // {
        //     AddInclude(x => x.Params);
        // }
        
        public AreasWithParamsSpec(FileRepoSpecParams areaSpecParam, Guid? levelId) 
            : base(x => 
            (string.IsNullOrEmpty(areaSpecParam.Search) ||
                x.Name.ToLower().Contains(areaSpecParam.Search) ||
            string.IsNullOrEmpty(areaSpecParam.Search) ||
                x.ArName.ToLower().Contains(areaSpecParam.Search) ||
            string.IsNullOrEmpty(areaSpecParam.Search) ||
                x.ArNameNo.ToLower().Contains(areaSpecParam.Search)) 
                &&
            (!levelId.HasValue || x.LevelId == levelId))
        {
            AddInclude(x => x.Params);
        }

        public AreasWithParamsSpec(Guid id) 
            : base(x => x.Id == id)
        {
            //* To Show Levels, Its okay to not include
            AddInclude(x => x.Params);
        }
        
    }
}