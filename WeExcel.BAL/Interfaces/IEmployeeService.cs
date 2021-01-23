using System;
using System.Collections.Generic;
using System.Text;
using WeExcel.BAL.Dtos;

namespace WeExcel.BAL.Interfaces
{
    public interface IEmployeeService
    {
        long Add(EmployeeDto employeeDto);
    }
}
