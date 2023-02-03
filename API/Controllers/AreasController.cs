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
    public class AreasController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AreasController(IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        [HttpPut("edit/{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<Area>> UpdateArea(
            int id, AreaUpdateDto areaToUpdate)
        {
            var area = await _unitOfWork.Repository<Area>().GetByIdAsync(id);

            _mapper.Map(areaToUpdate, area);

            _unitOfWork.Repository<Area>().Update(area);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating parameter"));

            var data = _mapper.Map<Area, AreaToReturn>(area);

            return Ok(data);
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<Area>> DeleteArea(int id)
        {
            var area = await _unitOfWork.Repository<Area>()
                .GetByIdAsync(id);
            
            _unitOfWork.Repository<Area>().Delete(area);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting paramater. Client error"));

            var data = _mapper.Map<Area, AreaToReturn>(area);
            
            return Ok(data);
        }
       


        [HttpPost]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<Area>> CreateArea(
            AreaCreateDto areaToCreate)
        {
            var area = _mapper.Map<AreaCreateDto, Area>(areaToCreate);

            _unitOfWork.Repository<Area>().Add(area);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating area"));

            var data = _mapper.Map<Area, AreaToReturn>(area);

            return Ok(data);
        }
        


        [HttpGet("{id}")]
        public async Task<ActionResult<Area>> GetArea(int id)
        {
            var spec = new AreasWithParamsSpec(id);
            var areas = await _unitOfWork.Repository<Area>().GetEntityWithSpec(spec);
            
            var areaToReturn = _mapper.Map<Area, AreaToReturn>(areas);
            return Ok(areaToReturn);
        }
        

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<Area>> UpdateAreaFacultyUserId(
            int id, AreaFacultyUserIdDto areaFacultyIdToUpdate)
        {
            var area = await _unitOfWork.Repository<Area>().GetByIdAsync(id);

            _mapper.Map(areaFacultyIdToUpdate, area);

            _unitOfWork.Repository<Area>().Update(area);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating area"));

              
            var areaToReturn = _mapper.Map<Area, AreaToReturn>(area);
            return Ok(areaToReturn);
           
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<Area>>> GetAreas(
            [FromQuery]FileRepoSpecParams areaSpecParams, int? levelId
        )
        {
            var spec = new AreasWithParamsSpec(areaSpecParams, levelId);
            var areas = await _unitOfWork.Repository<Area>().ListAsync(spec);
            var totaItems = await _unitOfWork.Repository<Area>().CountAsync(spec);
            
            var data = _mapper.Map<IReadOnlyList<Area>, 
                IReadOnlyList<AreaToReturn>>(areas);

            return Ok(new Pagination<AreaToReturn>(totaItems, data));
        }

    }
}