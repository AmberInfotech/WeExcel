
using Dapper.Contrib.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;
using WeExcel.BAL.Interfaces;
using WeExcel.DAL.Models;

namespace WeExcel.BAL.Services
{
    public class UserService : IUserService
    {
        #region Dependency Injection
        IConfiguration _configuration;
        IDbConnection connection => new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        UserManager<AppUser> _userManager;
        // constructor
        public UserService(
            UserManager<AppUser> userManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }
        #endregion

        public async Task<string> Add(AppUser appUser, string password)
        {
            try
            {
                using IDbConnection con = connection;
                con.Open();

                IdentityResult result = await _userManager.CreateAsync(appUser, password);

                // operation succeeded
                if (result.Succeeded)
                {
                    return appUser.Id;
                }

                // operation failed
                return string.Empty;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
