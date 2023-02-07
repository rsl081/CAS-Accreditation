using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class FileSpec : BaseSpecification<TheFile>
    {
  
        public FileSpec(string sort, FileRepoSpecParams fileSpecParam, 
            Guid? systemId, Guid? impleId, Guid? outputId) 
            : base(x => 
            (string.IsNullOrEmpty(fileSpecParam.Search) ||
                x.Name.ToLower().Contains(fileSpecParam.Search) ||
            string.IsNullOrEmpty(fileSpecParam.Search) ||
                x.FacultyName.ToLower().Contains(fileSpecParam.Search) ||
            string.IsNullOrEmpty(fileSpecParam.Search) ||
                x.Size.ToLower().Contains(fileSpecParam.Search) ||
            string.IsNullOrEmpty(fileSpecParam.Search) ||
                x.FileName.ToLower().Contains(fileSpecParam.Search)))
        {
            
            AddInclude(x => x.FileRepo);
            

            if(!string.IsNullOrEmpty(sort)) {

                switch(sort) 
                {
                    case "nameAsc":
                    
                        AddOrderBy(x => x.Name);
                        
                        break;

                    case "nameDesc":

                        AddOrderDescending(x => x.Name);
                        
                        break;
                        
                    case "fileNameAsc":
                    
                        AddOrderBy(x => x.FileName);
                        
                        break;

                    case "fileNameDesc":

                        AddOrderDescending(x => x.FileName);
                        
                        break;
                }
            }
        }

        public FileSpec(Guid id) 
            : base(x => x.Id == id)
        {
            AddInclude(x => x.FileRepo);
        }
    }
}