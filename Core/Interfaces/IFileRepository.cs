using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IFileRepository
    {
        Task<TheFile> GetTheFileByIdAsync(Guid id);
        Task<IReadOnlyList<TheFile>> GetTheFilesAsync();
    }
}