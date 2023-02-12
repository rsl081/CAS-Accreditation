using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class LevelsWithKeywordsSpec : BaseSpecification<Level>
    {
        public LevelsWithKeywordsSpec(FileRepoSpecParams levelSpecParams)
            : base(x => 
                (string.IsNullOrEmpty(levelSpecParams.Search) ||
                    x.LevelName.ToLower().Contains(levelSpecParams.Search) ||
                string.IsNullOrEmpty(levelSpecParams.Search) ||
                    x.Name.ToLower().Contains(levelSpecParams.Search)))
        {
            AddInclude(x => x.Keywords);
        }

        public LevelsWithKeywordsSpec(Guid id) 
            : base(x => x.Id == id)
        {
            AddInclude(x => x.Keywords);
        }
    }
}