using API.Dtos;
using API.Dtos.SIO;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<TheFile, FileToReturnDto>()
                .ForMember(f => f.FileRepo, o => o.MapFrom(s => s.FileRepo.Url))
                .ForMember(s => s.TheSystems, o => o.MapFrom(s => s.TheSystems.Select(x => x.Id).ToList()))
                .ForMember(i => i.TheImplementations, 
                    o => o.MapFrom(i => i.TheImplementations.Select(x => x.ImpleName).ToList()))
                .ForMember(opt => opt.TheOutputs, 
                    o => o.MapFrom(s => s.TheOutputs.Select(x => x.OutputName).ToList()));

            CreateMap<LevelCreateDto, Level>();
            CreateMap<LevelUpdateDto, Level>();
            CreateMap<Level, LevelToReturn>();

            CreateMap<ParameterUpdateDto, Parameter>();
            CreateMap<ParameterCreateDto, Parameter>();
            CreateMap<Parameter, ParameterToReturn>();
            CreateMap<Parameter, DateAndTimeDto>();

            CreateMap<SystemCreateDto, TheSystem>();
            CreateMap<TheSystem, SystemToReturn>();
            CreateMap<SystemUpdateDto, TheSystem>();

            CreateMap<ImpleCreateDto, TheImplementation>();
            CreateMap<TheImplementation, ImpleToReturn>();
            CreateMap<ImpleUpdateDto, TheImplementation>();

            CreateMap<OutputCreateDto, TheOutput>();
            CreateMap<TheOutput, OutputToReturn>();
            CreateMap<OutputUpdateDto, TheOutput>();

            CreateMap<FileCreateDto, TheFile>();
            CreateMap<FileUpdateDto, TheFile>();
            CreateMap<FileRepoCreateDto, FileRepo>().ReverseMap();

            CreateMap<FileRepo, FileRepoToReturn>();

            CreateMap<AreaFacultyUserIdDto, Area>();
            CreateMap<Area, AreaToReturn>();
            CreateMap<AreaCreateDto, Area>();
            CreateMap<AreaUpdateDto, Area>();

            CreateMap<UserPhoto, UserPhotoDto>();
            CreateMap<UserUpdateDto, AppUser>();
            
            CreateMap<AppUser, UserToReturn>()
                .ForMember(p => p.UserPhoto, o => o.MapFrom(s => s.UserPhoto.Url))
                .ForMember(p => p.UserRoles, o => o.MapFrom(s => s.UserRoles.Select(user => user.Role)));
            CreateMap<AppUser, FacultyToReturn>()
                .ForMember(p => p.UserPhoto, o => o.MapFrom(s => s.UserPhoto.Url))
                .ForMember(p => p.UserRoles, o => o.MapFrom(s => s.UserRoles.Select(user => user.Role)))
                .ForMember(p => p.Areas, o => o.MapFrom(s => s.Areas.Select(
                    user => new 
                    {
                        user.Level.LevelName,
                        user.ArNameNo,
                        user.ArName
                    })));
        
        }
    }
}