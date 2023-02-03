using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class FileTableSpec : BaseSpecification<FileRepo>
    {
        public FileTableSpec(FileRepoSpecParams fileSpecParam, 
            int? fileId) 
            : base(x => 
            (string.IsNullOrEmpty(fileSpecParam.Search) ||
                x.PublicId.ToLower().Contains(fileSpecParam.Search) ||
            string.IsNullOrEmpty(fileSpecParam.Search) ||
                x.Url.ToLower().Contains(fileSpecParam.Search))
                &&
            (!fileId.HasValue || x.TheFileId == fileId))
        {
            
            AddInclude(x => x.TheFile);
            
        }

        public FileTableSpec(int id) 
            : base(x => x.Id == id)
        {
            AddInclude(x => x.TheFile);
        }
    }
}