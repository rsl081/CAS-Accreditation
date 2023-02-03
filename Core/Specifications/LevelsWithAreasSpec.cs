using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class LevelsWithAreasSpec : BaseSpecification<Level>
    {
        public LevelsWithAreasSpec(FileRepoSpecParams levelSpecParams)
            : base(x => 
                (string.IsNullOrEmpty(levelSpecParams.Search) ||
                    x.LevelName.ToLower().Contains(levelSpecParams.Search) ||
                string.IsNullOrEmpty(levelSpecParams.Search) ||
                    x.Name.ToLower().Contains(levelSpecParams.Search)))
        {
            AddInclude(x => x.Areas);
        }

        public LevelsWithAreasSpec(int id) 
            : base(x => x.Id == id)
        {
            AddInclude(x => x.Areas);
        }
    }
}