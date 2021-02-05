using System.Collections.Generic;
using WeExcel.BAL.Dtos;
using WeExcel.DAL.Models;

namespace WeExcel.BAL.Interfaces
{
    public interface ILeaveService
    {
        long Add(Leave leave);
        long Add(LeaveDtos leaveDtos);
        IEnumerable<LeaveDtos> GetAll();
        LeaveDtos GetById(int id);
    }
}
