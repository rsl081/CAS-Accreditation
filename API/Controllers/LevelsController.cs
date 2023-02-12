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
    public class LevelsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public LevelsController(IUnitOfWork unitOfWork,
            IMapper mapper,
            IPhotoService photoService)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._photoService = photoService;
        }

        //*= Level =

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Level>> CreateLevel(LevelCreateDto levelToCreate)
        {
            var level = _mapper.Map<LevelCreateDto, Level>(levelToCreate);
             
            _unitOfWork.Repository<Level>().Add(level);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating level"));

            var levelToReturn = _mapper.Map<Level, LevelToReturn>(level);
            return Ok(levelToReturn);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Level>> UpdateLevel(
            Guid id, 
            LevelUpdateDto levelToUpdate)
        {
            //var levelUpdate = _mapper.Map<LevelUpdateDto, Level>(levelToUpdate);

            var level = await _unitOfWork.Repository<Level>()
                                .GetByIdAsync(id);

            _mapper.Map(levelToUpdate, level);

            _unitOfWork.Repository<Level>().Update(level);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating level"));

            var levelToReturn = _mapper.Map<Level, LevelToReturn>(level);
            return Ok(levelToReturn);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Level>> GetLevel(Guid id)
        {
            var spec = new LevelsWithKeywordsSpec(id);
            return await _unitOfWork.Repository<Level>().GetEntityWithSpec(spec);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Level>> DeleteLevel(Guid id)
        {
            var level = await _unitOfWork.Repository<Level>()
                .GetByIdAsync(id);
            
            _unitOfWork.Repository<Level>().Delete(level);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting level. Client error"));

            var levelToReturn = _mapper.Map<Level, LevelToReturn>(level);
            return Ok(levelToReturn);
        }
        
        [HttpGet]
        public async Task<ActionResult<Pagination<Level>>> GetLevels(
            [FromQuery]FileRepoSpecParams levelSpecParams
        )
        {
            var spec = new LevelsWithKeywordsSpec(levelSpecParams);
            var levels = await _unitOfWork.Repository<Level>().ListAsync(spec);

            var totalItems = await _unitOfWork.Repository<Level>().CountAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Level>,
                        IReadOnlyList<LevelToReturn>>(levels);

            return Ok(new Pagination<LevelToReturn>(totalItems, data));
        }
        


    }
}