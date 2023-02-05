using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface ILevelRepository
    {
        Task<Level> GetLevelByIdAsync(Guid id);
        Task<IReadOnlyList<Level>> GetLevelsAsync();
        Task<IReadOnlyList<Area>> GetAreasAsync();
        Task<IReadOnlyList<Parameter>> GetParamsAsync();
        Task<IReadOnlyList<TheSystem>> GetSystemsAsync();
        Task<IReadOnlyList<TheImplementation>> GetImplementationsAsync();
        Task<IReadOnlyList<TheOutput>> GetOutputsAsync();
        Task<IReadOnlyList<TheFile>> GetTheFilesAsync();
    }
}