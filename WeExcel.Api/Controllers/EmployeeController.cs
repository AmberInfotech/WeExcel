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
        #region DI
        IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }
        #endregion


        #region Methods
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

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            var employee = _employeeService.GetById(id);
            return Ok(employee);
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Put(int id, EmployeeDto employeeDto)
        {
            bool result = _employeeService.Update(id, employeeDto);
            if (result == true)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        #endregion
    }
}
