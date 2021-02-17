using Microsoft.AspNetCore.Identity;

namespace WeExcel.DAL.Models
{
    public class AppUser: IdentityUser
    {
        public bool IsActive { get; set; }
    }
}
