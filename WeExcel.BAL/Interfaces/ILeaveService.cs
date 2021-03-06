﻿using System.Collections.Generic;
using WeExcel.BAL.Dtos;
using WeExcel.DAL.Models;

namespace WeExcel.BAL.Interfaces
{
    public interface ILeaveService
    {
        long Add(Leave leave);
        long Add(LeaveDtos leaveDtos);
        IEnumerable<LeaveListDto> GetAll();
        LeaveDtos GetById(int id);
        int Update(int id, LeaveDtos leaveDtos);
        int Delete(int id);
        IEnumerable<LeaveType> GetLeaveTypes();
        LeaveType GetLeaveType(int id);
    }
}
