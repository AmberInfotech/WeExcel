using System;
using System.Collections.Generic;
using System.Text;
using WeExcel.DAL.Models;

namespace WeExcel.BAL.Interfaces
{
    public interface ILeaveService
    {
        long Add(Leave leave);
    }
}
