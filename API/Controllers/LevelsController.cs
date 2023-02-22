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
             
             List<Area> areas = new List<Area>();
             level.Keywords.Add(new Keyword(
                            new Guid("e19c0f65-997b-4258-b78c-c8c7732b3b47"),
                            "ADMINISTRATIVE MANUAL", new List<Area>{
                                new Area("Area 1", "Missions, Goals, and Objectives", new List<Parameter>{
                                    new Parameter("Parameter A", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 1")
                                        })
                                    })
                                }),
                                new Area("Area 2", "Faculty", new List<Parameter>{
                                    new Parameter("Parameter B", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 1")
                                        })
                                    }),
                                    new Parameter("Parameter D", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 1")
                                        })
                                    }),
                                    new Parameter("Parameter E", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 1")
                                        })
                                    }),
                                    new Parameter("Parameter F", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 1")
                                        })
                                    }),
                                }),
                                new Area("Area 3", "Cirriculum and Instruction", new List<Parameter>{
                                    new Parameter("Parameter C", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 2"),
                                            new Scheme("System 3"),
                                        })
                                    })
                                }),
                                new Area("Area 4", "Students", new List<Parameter>{
                                    new Parameter("Parameter B", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 4"),
                                        })
                                    }),
                                    new Parameter("Parameter C", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 2"),
                                            new Scheme("System 3"),
                                        })
                                    }),
                                }),
                                new Area("Area 5", "Research", new List<Parameter>{
                                    new Parameter("Parameter B", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 1"),
                                        })
                                    }),
                                    new Parameter("Parameter D", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 2"),
                                        })
                                    }),
                                }),
                                new Area("Area 10", "Administration", new List<Parameter>{
                                    new Parameter("Parameter F", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 1"),
                                            new Scheme("System 2"),
                                        })
                                    }),
                                    new Parameter("Parameter H", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 1"),
                                        })
                                    }),
                                }),
                            }));
             level.Keywords.Add(new Keyword(
                            new Guid("adf89e57-cf9e-439f-bbad-4a3d43caaf9e"),
                            "SYLLABI", new List<Area>{
                                
                                new Area("Area 3", "Cirriculum and Instruction", new List<Parameter>{
                                    new Parameter("Parameter A", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 1"),
                                            new Scheme("System 2"),
                                            new Scheme("System 3"),
                                        })
                                    }),
                                    new Parameter("Parameter B", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 2"),
                                            new Scheme("System 3"),
                                            new Scheme("System 4"),
                                        })
                                    }),
                                    
                                }),
                               
                                new Area("Area 9", "Laboratories", new List<Parameter>{
                                    new Parameter("Parameter B", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 1"),
                                            new Scheme("System 2"),
                                            new Scheme("System 3"),
                                        })
                                    }),
                                    
                                }),
                               
                            }));
             level.Keywords.Add(new Keyword(
                            new Guid("bf673748-6dd4-42bc-8494-41b394233c54"),
                            "FINANCIAL", new List<Area>{
                                new Area("Area 4", "Students", new List<Parameter>{
                                    new Parameter("Parameter A", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 6"),
                                            new Scheme("System 3"),
                                            new Scheme("System 2"),
                                        })
                                    })
                                }),
                                new Area("Area 5", "Research", new List<Parameter>{
                                    new Parameter("Parameter B", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 1")
                                        })
                                    }),
                                }),
                                new Area("Area 10", "Administration", new List<Parameter>{
                                    new Parameter("Parameter D", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 1"),
                                            new Scheme("System 3"),
                                        })
                                    })
                                }),
                            }));
             level.Keywords.Add(new Keyword(
                            new Guid("55b79cf1-bbf0-4c9e-9550-a35b9cc21603"),
                            "MINUTES OF THE MEETING", new List<Area>{
                                new Area("Area 4", "Students", new List<Parameter>{
                                    new Parameter("Parameter A", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 1")
                                        })
                                    }),
                                    new Parameter("Parameter B", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 5")
                                        })
                                    }),
                                }),
                                new Area("Area 5", "Research", new List<Parameter>{
                                    new Parameter("Parameter A", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 2"),
                                        })
                                    })
                                }),
                            }));
             level.Keywords.Add(new Keyword(
                            new Guid("bdcd585f-483d-423a-8f9d-a7de2eed21b4"),
                            "ACCOMPLISMENT REPORT", new List<Area>{
                                new Area("Area 3", "Cirriculum and Instruction", new List<Parameter>{
                                    new Parameter("Parameter D", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 15"),
                                            new Scheme("System 17"),
                                        })
                                    })
                                }),
                                
                                new Area("Area 4", "Students", new List<Parameter>{
                                    new Parameter("Parameter A", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 2"),
                                            new Scheme("System 6"),
                                        })
                                    }),
                                    
                                    
                                    new Parameter("Parameter B", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 4")
                                        })
                                    }),
                                    new Parameter("Parameter D", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 15"),
                                            new Scheme("System 17")
                                        })
                                    }),
                                }),
                                new Area("Area 9", "Laboratories", new List<Parameter>{
                                    new Parameter("Parameter C", new List<SysImpOutpt>{
                                        new SysImpOutpt("System", new List<Scheme>{
                                            new Scheme("System 1"),
                                        })
                                    })
                                }),
                            }));


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