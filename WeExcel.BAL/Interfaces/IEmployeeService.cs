using System.Collections.Generic;
using WeExcel.BAL.Dtos;

namespace WeExcel.BAL.Interfaces
{
    public interface IEmployeeService
    {
        long Add(EmployeeDto employeeDto);
        IEnumerable<EmployeeDto> GetAll();
        EmployeeDto GetById(int id);
        bool Update(int id, EmployeeDto employeeDto);
        int Delete(int id);
    }
}
