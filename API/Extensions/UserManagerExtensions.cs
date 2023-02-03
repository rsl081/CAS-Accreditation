using System.Security.Claims;
using API.Dtos;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            return user.FindFirstValue(ClaimTypes.Email);
        }
        public static async Task<AppUser> FindUserByEmailFromClaimsPrinciple(
            this UserManager<AppUser> input, ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);

            return await input.Users
                .Include(p => p.UserPhoto)
                .SingleOrDefaultAsync(x => x.Email == email);
        }

        public static async Task<AppUser> FindByEmailAsync(
            this UserManager<AppUser> input, LoginDto loginDto)
        {

            return await input.Users
                .Include(p => p.UserPhoto)
                .SingleOrDefaultAsync(x => x.Email == loginDto.Email);

        }

        public static async Task<List<AppUser>> ListAllUsers(
            this UserManager<AppUser> input)
        {
            
            return await input.Users
                .Include(p => p.UserPhoto)
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .ToListAsync();

        }
        public static async Task<List<AppUser>> ListAllAdmin(
            this UserManager<AppUser> input)
        {
          
            return await input.Users
                .Include(p => p.UserPhoto)
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .Where(u => u.UserRoles.All(r => r.Role.Name == "Admin"))
                .ToListAsync();

        }
        
        public static async Task<List<AppUser>> ListAllFaculty(
            this UserManager<AppUser> input)
        {
          
            return await input.Users
                .Include(p => p.UserPhoto)
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .Include(a => a.Areas)
                .ThenInclude(a => a.Level)
                .Where(u => u.UserRoles.All(r => r.Role.Name == "Faculty"))
                .ToListAsync();

        }

        public static async Task<List<AppUser>> ListAllAccre(
            this UserManager<AppUser> input)
        {
          
            return await input.Users
                .Include(p => p.UserPhoto)
                .Include(r => r.UserRoles)
                .ThenInclude(r => r.Role)
                .Where(u => u.UserRoles.All(r => r.Role.Name == "Accreditor"))
                .ToListAsync();

        }

    }
}