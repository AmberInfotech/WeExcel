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
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        #endregion

        public async Task<IActionResult> Post(UserDto userDto)
        {
            try
            {
                AppUser appUser= new AppUser();
                var userId = await _userService.Add(appUser, userDto.Password);

                return Ok(userId);
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }
    }
}
