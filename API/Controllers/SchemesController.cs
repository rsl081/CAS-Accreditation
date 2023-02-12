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
    public class SchemesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public SchemesController(IUnitOfWork unitOfWork,
            IMapper mapper,
            IPhotoService photoService)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._photoService = photoService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Scheme>> GetScheme(Guid id)
        {
            var spec = new SchemesWithSysImpOutptSpec(id);
            var system = await _unitOfWork.Repository<Scheme>().GetEntityWithSpec(spec);

            var data = _mapper.Map<Scheme, SchemeToReturn>(system);
            
            return Ok(data);
        }


        [HttpGet]
        public async Task<ActionResult<Pagination<Scheme>>> 
            GetSchemes(
           [FromQuery]FileRepoSpecParams fileRepoSpecParams, Guid? sysImpOutptId
        )
        {
            
            var spec = new SchemesWithSysImpOutptSpec(fileRepoSpecParams, sysImpOutptId);
            var scheme = await _unitOfWork.Repository<Scheme>().ListAsync(spec);
            var totalItems = await _unitOfWork.Repository<Scheme>().CountAsync(spec);
            
               
            var data = _mapper.Map<IReadOnlyList<Scheme>,
                        IReadOnlyList<SchemeToReturn>>(scheme);

            return Ok(new Pagination<SchemeToReturn>(totalItems, data));
        }


        [HttpPost]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<Scheme>> CreateScheme(
            SchemeCreateDto schemeToCreate)
        {
            var scheme = _mapper.Map<SchemeCreateDto, Scheme>(schemeToCreate);

            _unitOfWork.Repository<Scheme>().Add(scheme);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating scheme"));

            var data = _mapper.Map<Scheme, SchemeToReturn>(scheme);

            return Ok(data);
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<Scheme>> DeleteScheme(Guid id)
        {
            var scheme = await _unitOfWork.Repository<Scheme>()
                .GetByIdAsync(id);
            
            _unitOfWork.Repository<Scheme>().Delete(scheme);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting scheme. Client error"));

            var data = _mapper.Map<Scheme, SchemeToReturn>(scheme);
            
            return Ok(data);
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<Scheme>> UpdateScheme(
            Guid id, SchemeUpdateDto schemeToUpdate)
        {
            var scheme = await _unitOfWork.Repository<Scheme>().GetByIdAsync(id);

            _mapper.Map(schemeToUpdate, scheme);

            _unitOfWork.Repository<Scheme>().Update(scheme);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating scheme"));

            var data = _mapper.Map<Scheme, SchemeToReturn>(scheme);

            return Ok(data);
        }
    }
}