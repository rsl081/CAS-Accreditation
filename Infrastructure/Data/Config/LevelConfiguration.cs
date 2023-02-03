using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class LevelConfiguration : IEntityTypeConfiguration<Level>
    {
        public void Configure(EntityTypeBuilder<Level> builder)
        {
            // builder.Property(l => l.Id).IsRequired();
            // builder.Property(l => l.LevelName).IsRequired()
            //                     .HasMaxLength(100);
                        
            // builder.HasOne(a => a.Area).WithMany()
            //     .HasForeignKey(ai => ai.AreaId);
            // builder.HasOne(a => a.Area).WithMany()
            //     .HasForeignKey(ai => ai.AreasId);
            // builder.HasOne(l => l.Level).WithMany()
            //     .HasForeignKey(li => li.LevelsId);
        }
    }
}