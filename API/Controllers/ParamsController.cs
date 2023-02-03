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
    public class ParamsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public ParamsController(IUnitOfWork unitOfWork,
            IMapper mapper,
            IPhotoService photoService)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._photoService = photoService;
        }

        //*= Parameter =
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<Parameter>> UpdateParameter(
            int id, ParameterUpdateDto parameterToUpdate)
        {
            var parameter = await _unitOfWork.Repository<Parameter>().GetByIdAsync(id);

            _mapper.Map(parameterToUpdate, parameter);

            _unitOfWork.Repository<Parameter>().Update(parameter);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating parameter"));

            var data = _mapper.Map<Parameter, ParameterToReturn>(parameter);

            return Ok(data);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<Parameter>> CreateParameter(
            ParameterCreateDto parameterToCreate)
        {
            var parameter = _mapper.Map<ParameterCreateDto, Parameter>(parameterToCreate);

            _unitOfWork.Repository<Parameter>().Add(parameter);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating parameter"));

            var data = _mapper.Map<Parameter, ParameterToReturn>(parameter);

            return Ok(data);
        }
        

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<Parameter>> DeleteParameter(int id)
        {
            var parameter = await _unitOfWork.Repository<Parameter>()
                .GetByIdAsync(id);
            
            _unitOfWork.Repository<Parameter>().Delete(parameter);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting paramater. Client error"));

            var data = _mapper.Map<Parameter, ParameterToReturn>(parameter);
            
            return Ok(data);
        }
        

        [HttpGet("{id}")]
        public async Task<ActionResult<Parameter>> GetParam(int id)
        {
            var spec = new ParamsWithFilesSpec(id);
            var parameters = await _unitOfWork.Repository<Parameter>().GetEntityWithSpec(spec);

             var data = _mapper.Map<Parameter, ParameterToReturn>(parameters);
            
            return Ok(data);
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<Parameter>>> GetParams(
           [FromQuery]FileRepoSpecParams fileRepoSpecParams, int? areaId
        )
        {
            
            var spec = new ParamsWithFilesSpec(fileRepoSpecParams,areaId);
            var parameters = await _unitOfWork.Repository<Parameter>().ListAsync(spec);
            var totalItems = await _unitOfWork.Repository<Parameter>().CountAsync(spec);
            
               
            var data = _mapper.Map<IReadOnlyList<Parameter>,
                        IReadOnlyList<ParameterToReturn>>(parameters);

            return Ok(new Pagination<ParameterToReturn>(totalItems, data));
        }

    }
}