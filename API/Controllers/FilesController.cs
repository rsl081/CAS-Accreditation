using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FilesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public FilesController(IUnitOfWork unitOfWork,
            IMapper mapper,
            IPhotoService photoService)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._photoService = photoService;
        }
        
        //*= Files =
        [HttpGet("{id}")]
        public async Task<ActionResult<TheFile>> GetFile(Guid id)
        {
            var spec = new FileSpec(id);
            return await _unitOfWork.Repository<TheFile>().GetEntityWithSpec(spec);
        }

        [HttpGet(Name = "TheFile")]
        public async Task<ActionResult<Pagination<TheFile>>> GetFiles(
            [FromQuery]FileRepoSpecParams fileSpecParams, 
            Guid? systemId, Guid? impleId, Guid? outputId,
            string sort
        )
        {
            var spec = new FileSpec(sort, fileSpecParams, systemId, impleId, outputId);
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