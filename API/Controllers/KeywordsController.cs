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
    public class KeywordsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public KeywordsController(IUnitOfWork unitOfWork,
            IMapper mapper,
            IPhotoService photoService)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._photoService = photoService;
        }

        //*= Keyword =

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Keyword>> CreateKeyword(KeywordCreateDto keywordToCreate)
        {
            var keyword = _mapper.Map<KeywordCreateDto, Keyword>(keywordToCreate);
            
            _unitOfWork.Repository<Keyword>().Add(keyword);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating keyword"));

            var keywordToReturn = _mapper.Map<Keyword, KeywordToReturn>(keyword);
            return Ok(keywordToReturn);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Keyword>> UpdateKeyword(
            Guid id, 
            KeywordUpdateDto keywordToUpdate)
        {
            
            var keyword = await _unitOfWork.Repository<Keyword>()
                                .GetByIdAsync(id);

            _mapper.Map(keywordToUpdate, keyword);

            _unitOfWork.Repository<Keyword>().Update(keyword);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating keyword"));

            var keywordToReturn = _mapper.Map<Keyword, KeywordToReturn>(keyword);
            return Ok(keywordToReturn);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Keyword>> GetKeyword(Guid id)
        {
            var spec = new KeywordsWithAreasSpec(id);
            return await _unitOfWork.Repository<Keyword>().GetEntityWithSpec(spec);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Keyword>> DeleteKeyword(Guid id)
        {
            var keyword = await _unitOfWork.Repository<Keyword>()
                .GetByIdAsync(id);
            
            _unitOfWork.Repository<Keyword>().Delete(keyword);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting keyword. Client error"));

            var keywordToReturn = _mapper.Map<Keyword, KeywordToReturn>(keyword);
            return Ok(keywordToReturn);
        }
        
        [HttpGet]
        public async Task<ActionResult<Pagination<Keyword>>> GetKeywords(
            [FromQuery]FileRepoSpecParams keywordSpecParams
        )
        {
            var spec = new KeywordsWithAreasSpec(keywordSpecParams);
            var keywords = await _unitOfWork.Repository<Keyword>().ListAsync(spec);

            var totalItems = await _unitOfWork.Repository<Keyword>().CountAsync(spec);

            var data = _mapper.Map<IReadOnlyList<Keyword>,
                        IReadOnlyList<KeywordToReturn>>(keywords);

            return Ok(new Pagination<KeywordToReturn>(totalItems, data));
        }
        


    }
}