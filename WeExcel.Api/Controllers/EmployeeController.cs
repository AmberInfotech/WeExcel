using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeExcel.BAL.Dtos;
using WeExcel.BAL.Interfaces;

namespace WeExcel.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost]
        public IActionResult Post(EmployeeDto employeeDto)
        {
            long id = _employeeService.Add(employeeDto);
            return Ok(id);
        }

        [HttpGet]  
        public IActionResult GetAll()
        {
            var list = _employeeService.GetAll();
            return Ok(list);
        }

    }
}
