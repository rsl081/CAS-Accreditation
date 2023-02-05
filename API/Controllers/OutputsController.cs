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
    public class OutputsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public OutputsController(IUnitOfWork unitOfWork,
            IMapper mapper,
            IPhotoService photoService)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._photoService = photoService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TheOutput>> 
            GetOuput(Guid id)
        {
            var spec = new OutputsWithParamsSpec(id);
            var outpt = await _unitOfWork.Repository<TheOutput>().GetEntityWithSpec(spec);

            var data = _mapper.Map<TheOutput, OutputToReturn>(outpt);
            
            return Ok(data);
        }


        [HttpGet]
        public async Task<ActionResult<Pagination<TheOutput>>> 
            GetOutputs(
           [FromQuery]FileRepoSpecParams fileRepoSpecParams, Guid? paramId
        )
        {
            
            var spec = new OutputsWithParamsSpec(fileRepoSpecParams, paramId);
            var outputs = await _unitOfWork.Repository<TheOutput>()
                                                                    .ListAsync(spec);
            var totalItems = await _unitOfWork.Repository<TheOutput>().CountAsync(spec);
            
               
            var data = _mapper.Map<IReadOnlyList<TheOutput>,
                        IReadOnlyList<OutputToReturn>>(outputs);

            return Ok(new Pagination<OutputToReturn>(totalItems, data));
        }


        [HttpPost]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<TheOutput>> CreateOutput(
            OutputCreateDto outputToCreate)
        {
            var outpt = _mapper.Map<OutputCreateDto, TheOutput>(outputToCreate);

            _unitOfWork.Repository<TheOutput>().Add(outpt);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating output"));

            var data = _mapper.Map<TheOutput, OutputToReturn>(outpt);

            return Ok(data);
        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<TheOutput>> DeleteOutput(Guid id)
        {
            var outpt = await _unitOfWork.Repository<TheOutput>()
                                                            .GetByIdAsync(id);
            
            _unitOfWork.Repository<TheOutput>().Delete(outpt);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, 
                "Problem deleting output. Client error"));

            var data = _mapper.Map<TheOutput, OutputToReturn>(outpt);
            
            return Ok(data);
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Faculty")]
        public async Task<ActionResult<TheOutput>> UpdateOutput(
            Guid id, OutputUpdateDto outputToUpdate)
        {
            var outpt = await _unitOfWork.Repository<TheOutput>().GetByIdAsync(id);

            _mapper.Map(outputToUpdate, outpt);

            _unitOfWork.Repository<TheOutput>().Update(outpt);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, 
                            "Problem updating output"));

            var data = _mapper.Map<TheOutput, OutputToReturn>(outpt);

            return Ok(data);
        }
    }
}