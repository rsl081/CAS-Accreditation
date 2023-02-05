using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class PhotosWithUserSpec : BaseSpecification<UserPhoto>
    {
        public PhotosWithUserSpec()
        {
            AddInclude(x => x.AppUser);
        }

        public PhotosWithUserSpec(Guid id) 
            : base(x => x.Id == id)
        {
            //* To Show Levels, Its okay to not include
            AddInclude(x => x.AppUser);
        }
    }
}