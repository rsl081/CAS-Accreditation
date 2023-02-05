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
        public async Task<ActionResult<TheSystem>> GetSystem(Guid id)
        {
            var spec = new SystemsWithParamsSpec(id);
            var system = await _unitOfWork.Repository<TheSystem>().GetEntityWithSpec(spec);

            var data = _mapper.Map<TheSystem, SystemToReturn>(system);
            
            return Ok(data);
        }


        [HttpGet]
        public async Task<ActionResult<Pagination<TheSystem>>> 
            GetSystems(
           [FromQuery]FileRepoSpecParams fileRepoSpecParams, Guid? paramId
        )
        {
            
            var spec = new SystemsWithParamsSpec(fileRepoSpecParams, paramId);
            var systems = await _unitOfWork.Repository<TheSystem>().ListAsync(spec);
            var totalItems = await _unitOfWork.Repository<TheSystem>().CountAsync(spec);
            
               
            var data = _mapper.Map<IReadOnlyList<TheSystem>,
                        IReadOnlyList<SystemToReturn>>(systems);

            return Ok(new Pagination<SystemToReturn>(totalItems, data));
        }


        [HttpPost]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<TheSystem>> CreateSystem(
            SystemCreateDto systemToCreate)
        {
            var system = _mapper.Map<SystemCreateDto, TheSystem>(systemToCreate);

            _unitOfWork.Repository<TheSystem>().Add(system);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating system"));

            var data = _mapper.Map<TheSystem, SystemToReturn>(system);

            return Ok(data);
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<TheSystem>> DeleteSystem(Guid id)
        {
            var system = await _unitOfWork.Repository<TheSystem>()
                .GetByIdAsync(id);
            
            _unitOfWork.Repository<TheSystem>().Delete(system);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting system. Client error"));

            var data = _mapper.Map<TheSystem, SystemToReturn>(system);
            
            return Ok(data);
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<TheSystem>> UpdateSystem(
            Guid id, SystemUpdateDto sioToUpdate)
        {
            var system = await _unitOfWork.Repository<TheSystem>().GetByIdAsync(id);

            _mapper.Map(sioToUpdate, system);

            _unitOfWork.Repository<TheSystem>().Update(system);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating system"));

            var data = _mapper.Map<TheSystem, SystemToReturn>(system);

            return Ok(data);
        }
        

        
    }
}