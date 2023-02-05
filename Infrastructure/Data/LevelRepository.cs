using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class LevelRepository : ILevelRepository
    {
        public readonly StoreContext _context;
        public LevelRepository(StoreContext context)
        {
            this._context = context;
        }

        public async Task<Level> GetLevelByIdAsync(Guid id)
        {
            return await _context.Levels.FindAsync(id);
        }
        public async Task<IReadOnlyList<Level>> GetLevelsAsync()
        {
            return await _context.Levels
                            .Include(l => l.Areas)
                            .ToListAsync();
        }

        public async Task<IReadOnlyList<Area>> GetAreasAsync()
        {
            return await _context.Areas.ToListAsync();
        }

        public async Task<IReadOnlyList<Parameter>> GetParamsAsync()
        {
            return await _context.Params.ToListAsync();
        }
        
        public async Task<IReadOnlyList<TheSystem>> GetSystemsAsync()
        {
            return await _context.TheSystems.ToListAsync();
        }

        public async Task<IReadOnlyList<TheImplementation>> GetImplementationsAsync()
        {
            return await _context.TheImplementations.ToListAsync();
        }
        public async Task<IReadOnlyList<TheOutput>> GetOutputsAsync()
        {
            return await _context.TheOutputs.ToListAsync();
        }

        public async Task<IReadOnlyList<TheFile>> GetTheFilesAsync()
        {
            return await _context.TheFiles.ToListAsync();
        }
        
    }
}