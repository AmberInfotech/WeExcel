using Microsoft.AspNetCore.Mvc;
using WeExcel.Api.Models;
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

            if (id > 0)
            {
                return Ok(
                        new ResponseModel
                        {
                            Status = true,
                            Message = "Employee added successfully",
                            Data = id
                        });
            }
            else
            {
                return Ok(
                    new ResponseModel
                    {
                        Status = false,
                        Message = "Error. Employee could not be added."
                    });
            }

        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var list = _employeeService.GetAll();

            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Records fetched successfully",
                Data = list
            });
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(int id)
        {
            var employee = _employeeService.GetById(id);
            return Ok(new ResponseModel
            {
                Status = true,
                Message = "Records fetched successfully",
                Data = employee
            });
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Put(int id, EmployeeDto employeeDto)
        {
            bool result = _employeeService.Update(id, employeeDto);
            if (result == true)
            {
                return Ok(
                         new ResponseModel
                         {
                             Status = true,
                             Message = "Employee updated successfully",
                             Data = id
                         });
            }
            else
            {
                return Ok(
                         new ResponseModel
                         {
                             Status = false,
                             Message = "Employee could not be updated",
                             Data = id
                         });
            }
        }

        #endregion
    }
}
