using System.Text.Json;
using Core.Entities;
using Core.Entities.Identity;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager)
        {
                    
            if(!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "911465f9-be4d-4d61-949c-da9c9f7bea3c",
                        DisplayName = "Accreditor",
                        Email = "accre@test.com",
                        UserName = "accre@test.com",
                        UserPhoto = new UserPhoto("assets/img/user_icon_default.png"),
                        EmailConfirmed = true,
                    },

                    new AppUser
                    {
                        Id = "c65e6d63-19ca-493a-9084-2b4a610c77e8",
                        DisplayName = "Admin",
                        Email = "admin@test.com",
                        UserName = "admin@test.com",
                        UserPhoto = new UserPhoto("assets/img/user_icon_default.png"),
                        EmailConfirmed = true,
                    }
                };

                var roles = new List<AppRole>
                {
                    new AppRole {Name = "Admin"},
                    new AppRole {Name = "Faculty"},
                    new AppRole {Name = "Accreditor"}
                };  
             
                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                    if (user.Email == "accre@test.com") await userManager.AddToRoleAsync(user, "Accreditor");
                    if (user.Email == "admin@test.com") await userManager.AddToRoleAsync(user, "Admin");
                }

            }
        }
    }
}