using AutoMapper;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using WeExcel.BAL.Dtos;
using WeExcel.BAL.Interfaces;
using WeExcel.DAL.Models;

namespace WeExcel.BAL.Services
{
    public class EmployeeService : IEmployeeService
    {
        #region Dependency Injection
        IMapper _mapper;
        IConfiguration _configuration;
        IDbConnection connection => new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        // constructor
        public EmployeeService(IMapper mapper, IConfiguration configuration)
        {
            _mapper = mapper;
            _configuration = configuration;
        }
        #endregion

        public long Add(EmployeeDto employeeDto)
        {
            using IDbConnection con = connection;
            con.Open();

            // Map EmployeeDto to Employee model class
            Employee employee = _mapper.Map<Employee>(employeeDto);

            // employee.FirstName = employeeDto.FirstName;
            // employee.LastName = employeeDto.LastName;

            if (employee != null)
            {
                employee.CreatedBy = "sdasdsadasda";
                employee.CreatedOn = DateTime.Now;
                employee.ModifiedOn = DateTime.Now;
            }

            return con.Insert(employee);
        }

        public IEnumerable<EmployeeDto> GetAll()
        {
            using IDbConnection con = connection;
            con.Open();

            var list = con.GetAll<Employee>();

            IEnumerable<EmployeeDto> employeeDto = _mapper.Map<IEnumerable<EmployeeDto>>(list);

            return employeeDto;
        }

        public EmployeeDto GetById(int id)
        {
            using IDbConnection con = connection;
            con.Open();

            var list = con.Get<Employee>(id);

            EmployeeDto employeeDto = _mapper.Map<EmployeeDto>(list);

            return employeeDto;
        }

        public bool Update(int id, EmployeeDto employeeDto)
        {
            using IDbConnection con = connection;
            con.Open();

            var existing = con.Get<Employee>(id);
            if (existing == null)
            {
                throw new Exception("No such record");
            }

            // Map EmployeeDto to Employee model class
            Employee employee = _mapper.Map<Employee>(employeeDto);
            if (employee != null)
            {
                employee.Id = id;
                employee.CreatedBy = existing.CreatedBy;
                employee.CreatedOn = existing.CreatedOn;

                employee.ModifiedBy = "munish";
                employee.ModifiedOn = DateTime.Now;

                bool result = con.Update(employee);
                return result;
            }
            return false;
        }

        public int Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
