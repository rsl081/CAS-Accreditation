using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class RolesResolver : IValueResolver<AppUser, UserToReturn, string>
    {
        private readonly IConfiguration _configuration;

        public RolesResolver(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public string Resolve(AppUser source, UserToReturn destination, string destMember, 
                    ResolutionContext context)
        {
            // if(!string.IsNullOrEmpty(source.UserRoles)) 
            // {   
            // }
            foreach(AppUserRole u in source.UserRoles)
            {
                return u.Role.Name;
            }
            // return source.UserRoles.ToList().ToString();

            return null;
        }
    }
}