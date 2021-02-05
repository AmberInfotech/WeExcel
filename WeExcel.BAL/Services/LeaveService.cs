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

        public IEnumerable<LeaveDtos> GetAll()
        {
            using IDbConnection con = connection;
            con.Open();

            string query = @"select LeaveTypeId, EmpId, FromDate, ToDate, Reason    
                            from Leaves order by CreatedOn desc";

            IEnumerable<LeaveDtos> leaves = con.Query<LeaveDtos>(query);

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
        #endregion
    }
}
