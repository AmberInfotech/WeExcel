using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeExcel.BAL.Dtos;
using WeExcel.BAL.Interfaces;
using WeExcel.DAL.Models;

namespace WeExcel.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        #region DI
        IUserService _userService;
        IMapper _mapper;
        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }
        #endregion

        [HttpPost]
        public async Task<IActionResult> Post(UserDto userDto)
        {
            try
            {
                AppUser appUser = _mapper.Map<AppUser>(userDto);
                if (appUser == null)
                {
                    return BadRequest();
                }
                // Setting this value on server, instead of front-end
                appUser.IsActive = true;
                var userId = await _userService.Add(appUser, userDto.Password);

                return Ok(userId);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
