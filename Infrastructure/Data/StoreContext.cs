using Core.Entities;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext 
        : IdentityDbContext<AppUser, AppRole, string,
        IdentityUserClaim<string>, AppUserRole, IdentityUserLogin<string>,
        IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base
        (options)
        {}

        public DbSet<Level> Levels { get; set; }
        public DbSet<Keyword> Keywords { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Parameter> Params { get; set; }
        public DbSet<SysImpOutpt> SysImpOutpts { get; set; }
        public DbSet<TheFile> TheFiles { get; set; }

         protected override void OnModelCreating(
            ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            foreach (var property in modelBuilder.Model.GetEntityTypes()
                        .SelectMany(t => t.GetProperties())
                        .Where
                        ( p
                        => p.ClrType == typeof(DateTime) 
                            || p.ClrType == typeof(DateTime?)
                        )
                )
                {
                property.SetColumnType("timestamp without time zone");
                }

            modelBuilder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            modelBuilder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

            modelBuilder.Entity<Area>()
                .HasOne(p => p.Keyword)
                .WithMany(b => b.Areas)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}