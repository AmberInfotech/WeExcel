using Dapper;
using Dapper.Contrib.Extensions;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using WeExcel.BAL.Dtos;
using WeExcel.BAL.Interfaces;
using WeExcel.DAL.Models;

namespace WeExcel.BAL.Services
{
    public class LeaveService : ILeaveService
    {
        #region Dependency Injection
        IConfiguration _configuration;
        IDbConnection connection => new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        // constructor
        public LeaveService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        #endregion

        #region Methods
        // Option 1 to ADD a record
        public long Add(Leave leave)
        {
            using IDbConnection con = connection;
            con.Open();

            var id = con.Insert(leave);
            return id;
        }

        public long Add(LeaveDtos leaveDtos)
        {
            using IDbConnection con = connection;
            con.Open();

            string query = @"INSERT INTO Leaves(CreatedBy, CreatedOn, LeaveTypeId, EmpId, FromDate, ToDate, Reason)
                            VALUES(@CreatedBy, @CreatedOn, @LeaveTypeId, @EmpId, @FromDate, @ToDate, @Reason)";
            int id = con.Execute(query,
                 new
                 {
                     CreatedBy = "munish",
                     CreatedOn = DateTime.Now,
                     LeaveTypeId = leaveDtos.LeaveTypeId,
                     EmpId = leaveDtos.EmpId,
                     FromDate = leaveDtos.FromDate,
                     ToDate = leaveDtos.ToDate,
                     Reason = leaveDtos.Reason
                 },
                 commandType: CommandType.Text);

            return id;
        }

        public IEnumerable<LeaveListDto> GetAll()
        {
            using IDbConnection con = connection;
            con.Open();

            string query = @"select LeaveTypeId, EmpId, FromDate, ToDate, Reason, 
                            CreatedBy, CreatedOn  from Leaves order by CreatedOn desc";

            IEnumerable<LeaveListDto> leaves = con.Query<LeaveListDto>(query);

            return leaves;
        }

        public LeaveDtos GetById(int id)
        {
            using IDbConnection con = connection;
            con.Open();

            string query = @"select LeaveTypeId, EmpId, FromDate, ToDate, Reason    
                            from Leaves where Id = @Id";

            LeaveDtos leave = con.QueryFirstOrDefault<LeaveDtos>(query,
                new
                {
                    id
                });

            return leave;
        }

        public int Update(int id, LeaveDtos leaveDtos)
        {
            using IDbConnection con = connection;
            con.Open();

            string query = @"update Leaves set 
                            ModifiedBy = @ModifiedBy, 
                            ModifiedOn = @ModifiedOn, 
                            LeaveTypeId = @LeaveTypeId, 
                            EmpId = @EmpId, 
                            FromDate=@FromDate, 
                            ToDate=@ToDate, 
                            Reason=@Reason where Id = @Id";

            int rowsAffected = con.Execute(query, new
            {
                ModifiedBy = "munish chauhan",
                ModifiedOn = DateTime.Now,
                LeaveTypeId = leaveDtos.LeaveTypeId,
                // EmpId = leaveDtos.EmpId
                leaveDtos.EmpId,
                leaveDtos.FromDate,
                leaveDtos.ToDate,
                leaveDtos.Reason,
                id
            }, commandType: CommandType.Text);

            return rowsAffected;
        }

        public int Delete(int id)
        {
            using IDbConnection con = connection;
            con.Open();

            string query = "delete from Leaves where id = @id";

            int rows = con.Execute(query, new { id }, commandType: CommandType.Text);

            return rows;
        }

        public IEnumerable<LeaveType> GetLeaveTypes()
        {
            using IDbConnection con = connection;
            con.Open();

            string query = "select * from LeaveTypes order by LeaveTypeName";

            IEnumerable<LeaveType> leaveTypes = con.Query<LeaveType>(query);

            return leaveTypes;

        }

        public LeaveType GetLeaveType(int id)
        {
            using IDbConnection con = connection;
            con.Open();

            string query = "select * from LeaveTypes where Id = @id";

            LeaveType leaveType = con.QueryFirstOrDefault<LeaveType>(query, new { id });

            return leaveType;

        }
        #endregion
    }
}
