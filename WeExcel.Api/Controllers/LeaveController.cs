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
    public class LeaveController : ControllerBase
    {
        #region DI
        ILeaveService _leaveService;
        IMapper _mapper;
        public LeaveController(ILeaveService leaveService, IMapper mapper)
        {
            _leaveService = leaveService;
            _mapper = mapper;
        }
        #endregion

        // Method 1 to Add (using Dapper Extensions)
        [HttpPost]
        public IActionResult Post(LeaveDtos leaveDto)
        {
            Leave leave = _mapper.Map<Leave>(leaveDto);
            if (leave != null)
            {
                leave.CreatedBy = "munish";
                leave.CreatedOn = DateTime.Now;

                long id = _leaveService.Add(leave);

                return Ok(id);
            }
            return BadRequest();
        }

        // Method 1 to Add (using SQL Query)
        [HttpPost]
        [Route("option2")]
        public IActionResult Post2(LeaveDtos leaveDto)
        {
            long id = _leaveService.Add(leaveDto);

            return Ok(id);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            IEnumerable<LeaveDtos> leave = _leaveService.GetAll();

            return Ok(leave);
        }
    }
}
