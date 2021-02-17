using System.Threading.Tasks;
using WeExcel.DAL.Models;

namespace WeExcel.BAL.Interfaces
{
    public interface IUserService
    {
        Task<string> Add(AppUser appUser, string password);
    }
}
