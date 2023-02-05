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
    public class ImplementationsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public ImplementationsController(IUnitOfWork unitOfWork,
            IMapper mapper,
            IPhotoService photoService)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._photoService = photoService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TheImplementation>> GetImplementation(Guid id)
        {
            var spec = new ImplementationsWithParamsSpec(id);
            var imple = await _unitOfWork.Repository<TheImplementation>().GetEntityWithSpec(spec);

            var data = _mapper.Map<TheImplementation, ImpleToReturn>(imple);
            
            return Ok(data);
        }


        [HttpGet]
        public async Task<ActionResult<Pagination<TheImplementation>>> 
            GetImplementations(
           [FromQuery]FileRepoSpecParams fileRepoSpecParams, Guid? paramId
        )
        {
            
            var spec = new ImplementationsWithParamsSpec(fileRepoSpecParams, paramId);
            var implementations = await _unitOfWork.Repository<TheImplementation>()
                                                                    .ListAsync(spec);
            var totalItems = await _unitOfWork.Repository<TheImplementation>().CountAsync(spec);
            
               
            var data = _mapper.Map<IReadOnlyList<TheImplementation>,
                        IReadOnlyList<ImpleToReturn>>(implementations);

            return Ok(new Pagination<ImpleToReturn>(totalItems, data));
        }


        [HttpPost]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<TheImplementation>> CreateImplementation(
            ImpleCreateDto impleToCreate)
        {
            var imple = _mapper.Map<ImpleCreateDto, TheImplementation>(impleToCreate);

            _unitOfWork.Repository<TheImplementation>().Add(imple);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating implementation"));

            var data = _mapper.Map<TheImplementation, ImpleToReturn>(imple);

            return Ok(data);
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<TheImplementation>> DeleteImplementation(Guid id)
        {
            var imple = await _unitOfWork.Repository<TheImplementation>()
                                                            .GetByIdAsync(id);
            
            _unitOfWork.Repository<TheImplementation>().Delete(imple);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting implementation. Client error"));

            var data = _mapper.Map<TheImplementation, ImpleToReturn>(imple);
            
            return Ok(data);
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<TheImplementation>> UpdateImplementation(
            Guid id, ImpleUpdateDto sioToUpdate)
        {
            var imple = await _unitOfWork.Repository<TheImplementation>().GetByIdAsync(id);

            _mapper.Map(sioToUpdate, imple);

            _unitOfWork.Repository<TheImplementation>().Update(imple);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating implementation"));

            var data = _mapper.Map<TheImplementation, ImpleToReturn>(imple);

            return Ok(data);
        }
    }
}