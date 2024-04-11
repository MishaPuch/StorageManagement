using AutoMapper;
using BLL_StorageManagement.Dto;
using DAL.Model;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserDto, User>()
            .ForMember(dest => dest.Role, opt => opt.MapAtRuntime()) ;

    }
}
