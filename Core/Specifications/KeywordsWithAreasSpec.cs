using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class KeywordsWithAreasSpec : BaseSpecification<Keyword>
    {
        public KeywordsWithAreasSpec(FileRepoSpecParams levelSpecParams,
                Guid? levelId)
            : base(x => 
                (string.IsNullOrEmpty(levelSpecParams.Search) ||
                    x.KeywordName.ToLower().Contains(levelSpecParams.Search) ||
                string.IsNullOrEmpty(levelSpecParams.Search) ||
                    x.Name.ToLower().Contains(levelSpecParams.Search))
                    &&
                (!levelId.HasValue || x.LevelId == levelId))
        {
            AddInclude(x => x.Level);
        }

        public KeywordsWithAreasSpec(Guid id) 
            : base(x => x.Id == id)
        {
            AddInclude(x => x.Level);
        }
    }
}