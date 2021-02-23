using AutoMapper;
using WeExcel.BAL.Dtos;
using WeExcel.DAL.Models;

namespace WeExcel.BAL.Services
{
    public class AutoMapperConfiguration: Profile
    {
        public AutoMapperConfiguration()
        {
            CreateMap<EmployeeDto, Employee>();
            CreateMap<Employee, EmployeeDto>();

            CreateMap<LeaveDtos, Leave>();
            CreateMap<UserDto, AppUser>();
        }
    }
}


