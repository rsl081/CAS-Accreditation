using System.Text.RegularExpressions;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class FilesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly StoreContext _context;

        public FilesController(IUnitOfWork unitOfWork,
            IMapper mapper,
            IPhotoService photoService,
            StoreContext context)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._photoService = photoService;
            this._context = context;
        }
        
        //*= Files =
        [HttpGet("{id}")]
        public async Task<ActionResult> GetFile(Guid id, [FromQuery]string search)
        {
            search = search.ToLower();
            
            var file = await _context.TheFiles
                                .Select((f) => new {
                                    Id = f.Id,
                                    Keyword = f.Scheme.SysImpOutpt.Parameter.Area.Keyword.Level.Keywords.Select(
                                        k => new {
                                            k.Id,
                                            k.KeywordName,
                                            k.Level.LevelName,
                                            Area = k.Areas.Select(a => 
                                                new {
                                                    a.Id,
                                                    a.ArNameNo,
                                                    a.ArName,
                                                    Parameter = a.Params.Select(
                                                        p => new {
                                                            p.Id,
                                                            p.ParamName,
                                                            SIO = p.SysImpOutpts.Select(s => new {
                                                                s.Id,
                                                                s.SystemName,
                                                                Schemes = s.Schemes.Select(s => new {
                                                                    s.Id,
                                                                    s.SchemeName
                                                                }).ToList()
                                                            }).ToList(),
                                                    }).ToList(),
                                                }).ToList(),
                                        }
                                    ).Where(k =>
                                        search.Contains(k.KeywordName!.ToLower())
                                        ).ToList(),
                                }).FirstOrDefaultAsync(x => x.Id == id);

                    
                    
            return Ok(file);
        }

        public string Test(string q, string keyword)
        {
            // if(q.Contains(keyword)) {
            //     return keyword;
            // }
            return "qwe";
        }
        
        [HttpGet("TheFileGeneral")]
        public async Task<ActionResult<Pagination<TheFile>>> GetFilesGeneral(
            [FromQuery]string search
        )
        {
           
     
            // var files = await _context.TheFiles
            //                     .Select(f => new TheFile{
            //                         FileName = f.FileName,
            //                         Scheme = f.Scheme.
            //                     })
            //                     .ToListAsync();

            var files = await _context.TheFiles
                                .Select(f => new FileToReturnDto {
                                    Id = f.Id,
                                    FileRepo = f.FileRepo.Url,
                                    FileName = f.FileName,
                                    Name = f.Name,
                                    Size = f.Size,
                                    Scheme = f.Scheme.SchemeName,
                                    SysImpOutpt = f.Scheme.SysImpOutpt.SystemName,
                                    Parameter = f.Scheme.SysImpOutpt.Parameter.ParamName,
                                    Area = f.Scheme.SysImpOutpt.Parameter.Area.ArNameNo,
                                })
                                .ToListAsync();

            var countData = await _context.TheFiles
                                .Select(f => new{
                                    File = new {
                                            f.FileName,
                                            f.Name,
                                            f.Size,
                                        },
                                    Scheme = f.Scheme.SchemeName,
                                    SysImpOutpt = f.Scheme.SysImpOutpt.SystemName,
                                    Parameter = f.Scheme.SysImpOutpt.Parameter.ParamName,
                                    Area = f.Scheme.SysImpOutpt.Parameter.Area.ArNameNo,
                                }).CountAsync();

                    
            if (!String.IsNullOrEmpty(search))
            {
                search = search.ToLower();
                files = files.Where(
                        f => f.FileName!.ToLower().Contains(search) ||
                        f.Size!.ToLower().Contains(search) ||
                        f.Name!.ToLower().Contains(search) ||
                        f.Scheme!.ToLower().Contains(search) ||
                        f.SysImpOutpt!.ToLower().Contains(search) ||
                        f.Parameter!.ToLower().Contains(search) ||
                        f.Area!.ToLower().Contains(search))
                    .ToList();
            }

            
            // var data = _mapper.Map<IReadOnlyList<TheFile>,
            //             IReadOnlyList<FileToReturnDto>>(files);
            
            return Ok(new Pagination<FileToReturnDto>(countData, files));
        }

        [HttpGet(Name = "TheFile")]
        public async Task<ActionResult<Pagination<TheFile>>> GetFiles(
            [FromQuery]FileRepoSpecParams fileSpecParams, 
            Guid? schemeId,
            string sort
        )
        {
            var spec = new FileSpec(sort, fileSpecParams, schemeId);

            var files = await _unitOfWork.Repository<TheFile>().ListAsync(spec);
            

            var totalItems = await _unitOfWork.Repository<TheFile>().CountAsync(spec);

            
            var data = _mapper.Map<IReadOnlyList<TheFile>,
                        IReadOnlyList<FileToReturnDto>>(files);

            return Ok(new Pagination<FileToReturnDto>(totalItems,data));
        }


        [HttpGet("repo")]
        public async Task<ActionResult<Pagination<FileRepo>>> GetFileRepos(
            [FromQuery]FileRepoSpecParams fileSpecParams, Guid? fileId
        )
        {
            
            var spec = new FileTableSpec(fileSpecParams, fileId);
            var files = await _unitOfWork.Repository<FileRepo>().ListAsync(spec);
            
            var totalItems = await _unitOfWork.Repository<FileRepo>().CountAsync(spec);
            
            var data = _mapper.Map<IReadOnlyList<FileRepo>,
                        IReadOnlyList<FileRepoToReturn>>(files);

            return Ok(new Pagination<FileRepoToReturn>(totalItems,data));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<TheFile>> DeleteFile(Guid id)
        {
            var theFile = await _unitOfWork.Repository<TheFile>()
                .GetByIdAsync(id);
            
            _unitOfWork.Repository<TheFile>().Delete(theFile);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting file. Client error"));

            return Ok();
        }


        [HttpPost]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<TheFile>> CreateFiles(
            FileCreateDto fileToCreate)
        {
            var theFile = _mapper.Map<FileCreateDto, TheFile>(fileToCreate);

            _unitOfWork.Repository<TheFile>().Add(theFile);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating file"));

            var data = _mapper.Map<TheFile, FileToReturnDto>(theFile);
            return Ok(data);
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<TheFile>> UpdateFiles(
            Guid id, FileUpdateDto fileToUpdate)
        {
            var theFile = await _unitOfWork.Repository<TheFile>().GetByIdAsync(id);

            _mapper.Map(fileToUpdate, theFile);

            _unitOfWork.Repository<TheFile>().Update(theFile);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating file"));

            var data = _mapper.Map<TheFile, FileToReturnDto>(theFile);
            return Ok(data);
        }

        [HttpPost("add-file/{id}")]
        public async Task<ActionResult<FileRepoCreateDto>> AddFile(
            IFormFile file, Guid id)
        {
            var theFile = await _unitOfWork.Repository<TheFile>()
                                            .GetByIdAsync(id);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) return BadRequest(result.Error.Message);

            var fileRepo = new FileRepo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                TheFileId = theFile.Id,
            };

            theFile.FileRepo = fileRepo;
            _unitOfWork.Repository<FileRepo>().Add(theFile.FileRepo);
        
            if (await _unitOfWork.Complete() <= 0)
            {
                return BadRequest("Problem adding file");
            }

            return CreatedAtRoute("TheFile",
                new { username = theFile.FileName },
                _mapper.Map<FileRepoCreateDto>(fileRepo));


        }

        [HttpDelete("delete-file-repo/{id}")]
        public async Task<ActionResult<FileRepo>> DeleteFileRepo(Guid id)
        {

            var file = await _unitOfWork.Repository<FileRepo>().GetByIdAsync(id);

            if (file == null) return NotFound();

            if (file.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(file.PublicId);
                // if (result.Error != null) return BadRequest(result.Error.Message);
            }

            _unitOfWork.Repository<FileRepo>().Delete(file);

            if (await _unitOfWork.Complete() <= 0) return BadRequest(new ApiResponse(400, "Problem deleting file repo"));

            return Ok();
        }
    }
}