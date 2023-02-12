using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos.SIO;
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
    public class SystemsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public SystemsController(IUnitOfWork unitOfWork,
            IMapper mapper,
            IPhotoService photoService)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._photoService = photoService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SysImpOutpt>> GetSystem(Guid id)
        {
            var spec = new SystemsWithParamsSpec(id);
            var system = await _unitOfWork.Repository<SysImpOutpt>().GetEntityWithSpec(spec);

            var data = _mapper.Map<SysImpOutpt, SystemToReturn>(system);
            
            return Ok(data);
        }


        [HttpGet]
        public async Task<ActionResult<Pagination<SysImpOutpt>>> 
            GetSystems(
           [FromQuery]FileRepoSpecParams fileRepoSpecParams, Guid? paramId
        )
        {
            
            var spec = new SystemsWithParamsSpec(fileRepoSpecParams, paramId);
            var systems = await _unitOfWork.Repository<SysImpOutpt>().ListAsync(spec);
            var totalItems = await _unitOfWork.Repository<SysImpOutpt>().CountAsync(spec);
            
               
            var data = _mapper.Map<IReadOnlyList<SysImpOutpt>,
                        IReadOnlyList<SystemToReturn>>(systems);

            return Ok(new Pagination<SystemToReturn>(totalItems, data));
        }


        [HttpPost]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<SysImpOutpt>> CreateSystem(
            SystemCreateDto systemToCreate)
        {
            var system = _mapper.Map<SystemCreateDto, SysImpOutpt>(systemToCreate);

            _unitOfWork.Repository<SysImpOutpt>().Add(system);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating system"));

            var data = _mapper.Map<SysImpOutpt, SystemToReturn>(system);

            return Ok(data);
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<SysImpOutpt>> DeleteSystem(Guid id)
        {
            var system = await _unitOfWork.Repository<SysImpOutpt>()
                .GetByIdAsync(id);
            
            _unitOfWork.Repository<SysImpOutpt>().Delete(system);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting system. Client error"));

            var data = _mapper.Map<SysImpOutpt, SystemToReturn>(system);
            
            return Ok(data);
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<SysImpOutpt>> UpdateSystem(
            Guid id, SystemUpdateDto sioToUpdate)
        {
            var system = await _unitOfWork.Repository<SysImpOutpt>().GetByIdAsync(id);

            _mapper.Map(sioToUpdate, system);

            _unitOfWork.Repository<SysImpOutpt>().Update(system);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating system"));

            var data = _mapper.Map<SysImpOutpt, SystemToReturn>(system);

            return Ok(data);
        }
        

        
    }
}