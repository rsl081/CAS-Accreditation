using API.Dtos;
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
                .ForMember(f => f.FileRepo, o => o.MapFrom(s => s.FileRepo.Url));

            CreateMap<LevelCreateDto, Level>();
            CreateMap<LevelUpdateDto, Level>();
            CreateMap<Level, LevelToReturn>();

            CreateMap<ParameterCreateDto, Parameter>();
            CreateMap<ParameterUpdateDto, Parameter>();
            CreateMap<Parameter, ParameterToReturn>();
            CreateMap<Parameter, DateAndTimeDto>();

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