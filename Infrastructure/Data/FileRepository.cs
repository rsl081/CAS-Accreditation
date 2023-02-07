using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class FileRepository : IFileRepository
    {
        public readonly StoreContext _context;
        public FileRepository(StoreContext context)
        {
            this._context = context;
        }
        public Task<TheFile> GetTheFileByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<IReadOnlyList<TheFile>> GetTheFilesAsync()
        {
            return await _context.TheFiles
                                .Include(x => x.TheSystems)
                                .ToListAsync();
        }

    }
}